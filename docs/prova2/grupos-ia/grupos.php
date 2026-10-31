<?php
/**
 * CRUD de Grupos de Produtos com PHP e SQLite Nativo (PDO)
 * Doceria da Vovó Maria - Confeitaria
 *
 * Funciona diretamente no PHP (XAMPP / Servidor Apache / PHP Built-in)
 * SEM NECESSIDADE DE NENHUM PROGRAMA OU SERVIDOR EXTERNO (Node.js) RODANDO.
 */

// Define caminho do arquivo de banco SQLite no mesmo diretório
$dbPath = __DIR__ . '/confeitaria.db';

try {
    $pdo = new PDO('sqlite:' . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // Configurações para evitar travamentos de concorrência (database table locked)
    $pdo->exec("PRAGMA busy_timeout = 5000;");
    $pdo->exec("PRAGMA journal_mode = WAL;");

    // Criação da tabela no SQLite caso ainda não exista
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS grupos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL UNIQUE,
            descricao TEXT,
            status TEXT NOT NULL DEFAULT 'ativo',
            dataCriacao TEXT NOT NULL
        );
    ");

    // Dados padrão da confeitaria
    $gruposPadrao = [
        [
            'nome' => 'Bolos e Tortas',
            'descricao' => 'Bolos artesanais confeitados, bolos caseiros fatiados, tortas doces e cheesecakes',
            'status' => 'ativo',
            'dataCriacao' => '2026-09-01'
        ],
        [
            'nome' => 'Pudins e Sobremesas',
            'descricao' => 'Pudim tradicional de leite condensado com calda de caramelo, mousses e pavês',
            'status' => 'ativo',
            'dataCriacao' => '2026-09-05'
        ],
        [
            'nome' => 'Quitandas e Biscoitos',
            'descricao' => 'Pão de queijo quentinho, biscoitos amanteigados de nata e broas de milho caseiras',
            'status' => 'ativo',
            'dataCriacao' => '2026-09-10'
        ],
        [
            'nome' => 'Doces Finos e Trufas',
            'descricao' => 'Brigadeiros gourmet belgas, beijinhos, trufas recheadas, camafeus de nozes e bem-casados',
            'status' => 'ativo',
            'dataCriacao' => '2026-09-15'
        ],
        [
            'nome' => 'Salgados Artesanais',
            'descricao' => 'Coxinhas cremosas de frango com catupiry, empadas amanteigadas, quiches e folhados',
            'status' => 'ativo',
            'dataCriacao' => '2026-09-20'
        ],
        [
            'nome' => 'Bebidas e Cafés Especiais',
            'descricao' => 'Cafés espressos de grãos selecionados, cappuccino cremoso, sucos naturais e chás',
            'status' => 'ativo',
            'dataCriacao' => '2026-09-22'
        ]
    ];
} catch (PDOException $e) {
    die("Erro ao conectar no banco SQLite: " . $e->getMessage());
}

// Mensagens de feedback
$mensagemAlerta = '';
$tipoAlerta = 'success';

// ==============================================================
// PROCESSAMENTO DE AÇÕES (POST)
// ==============================================================
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    $acao = $_POST['acao'] ?? '';

    // 1. RECRIAR BANCO E RESETAR IDS (SEM LOCKS)
    if ($acao === 'resetar_ids') {
        try {
            $pdo->beginTransaction();

            // Limpa os registros existentes
            $pdo->exec("DELETE FROM grupos;");

            // Zera o contador autoincrement na tabela interna sqlite_sequence
            try {
                $pdo->exec("DELETE FROM sqlite_sequence WHERE name = 'grupos';");
            } catch (Exception $e) {
            }

            // Insere novamente os dados padrão da confeitaria iniciando do ID 1
            $stmtInsert = $pdo->prepare("INSERT INTO grupos (nome, descricao, status, dataCriacao) VALUES (:nome, :descricao, :status, :dataCriacao)");
            foreach ($gruposPadrao as $g) {
                $stmtInsert->execute($g);
            }
            $stmtInsert->closeCursor();
            $stmtInsert = null;

            $pdo->commit();

            header("Location: grupos.php?msg=" . urlencode("Banco SQLite recriado com sucesso! IDs reiniciados a partir do 1.") . "&tipo=success");
            exit;
        } catch (Exception $e) {
            if ($pdo->inTransaction()) {
                $pdo->rollBack();
            }
            $mensagemAlerta = "Erro ao recriar banco: " . $e->getMessage();
            $tipoAlerta = 'danger';
        }
    }

    // 2. EXCLUIR GRUPO (DELETE)
    if ($acao === 'excluir') {
        $idExcluir = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
        if ($idExcluir) {
            try {
                $stmtDel = $pdo->prepare("DELETE FROM grupos WHERE id = :id");
                $stmtDel->execute([':id' => $idExcluir]);
                $stmtDel->closeCursor();
                $stmtDel = null;

                header("Location: grupos.php?msg=" . urlencode("Grupo excluído com sucesso do SQLite!") . "&tipo=info");
                exit;
            } catch (PDOException $e) {
                $mensagemAlerta = "Erro ao excluir grupo: " . $e->getMessage();
                $tipoAlerta = 'danger';
            }
        }
    }

    // 3. INCLUIR NOVO GRUPO (CREATE)
    if ($acao === 'incluir') {
        $nome = trim($_POST['nome'] ?? '');
        $descricao = trim($_POST['descricao'] ?? '');
        $status = $_POST['status'] ?? 'ativo';
        $dataCriacao = $_POST['dataCriacao'] ?: date('Y-m-d');

        if (empty($nome)) {
            $mensagemAlerta = "Por favor, preencha o nome do grupo!";
            $tipoAlerta = 'warning';
        } else {
            // Verifica duplicidade no SQLite
            $stmtCheck = $pdo->prepare("SELECT COUNT(*) FROM grupos WHERE LOWER(nome) = LOWER(:nome)");
            $stmtCheck->execute([':nome' => $nome]);
            $jaExiste = $stmtCheck->fetchColumn() > 0;
            $stmtCheck->closeCursor();
            $stmtCheck = null;

            if ($jaExiste) {
                $mensagemAlerta = "Já existe um grupo cadastrado com o nome '{$nome}'!";
                $tipoAlerta = 'warning';
            } else {
                try {
                    $stmtAdd = $pdo->prepare("INSERT INTO grupos (nome, descricao, status, dataCriacao) VALUES (:nome, :descricao, :status, :dataCriacao)");
                    $stmtAdd->execute([
                        ':nome' => $nome,
                        ':descricao' => $descricao,
                        ':status' => $status,
                        ':dataCriacao' => $dataCriacao
                    ]);
                    $novoId = $pdo->lastInsertId();
                    $stmtAdd->closeCursor();
                    $stmtAdd = null;

                    header("Location: grupos.php?msg=" . urlencode("Grupo '{$nome}' incluído com sucesso sob ID #{$novoId}!") . "&tipo=success");
                    exit;
                } catch (PDOException $e) {
                    $mensagemAlerta = "Erro ao incluir grupo no SQLite: " . $e->getMessage();
                    $tipoAlerta = 'danger';
                }
            }
        }
    }

    // 4. ATUALIZAR GRUPO EXISTENTE (UPDATE)
    if ($acao === 'salvar_edicao') {
        $id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
        $nome = trim($_POST['nome'] ?? '');
        $descricao = trim($_POST['descricao'] ?? '');
        $status = $_POST['status'] ?? 'ativo';
        $dataCriacao = $_POST['dataCriacao'] ?: date('Y-m-d');

        if (empty($nome) || !$id) {
            $mensagemAlerta = "Dados inválidos para edição do grupo!";
            $tipoAlerta = 'warning';
        } else {
            // Verifica se outro grupo já tem este nome
            $stmtCheck = $pdo->prepare("SELECT COUNT(*) FROM grupos WHERE LOWER(nome) = LOWER(:nome) AND id != :id");
            $stmtCheck->execute([':nome' => $nome, ':id' => $id]);
            $jaExiste = $stmtCheck->fetchColumn() > 0;
            $stmtCheck->closeCursor();
            $stmtCheck = null;

            if ($jaExiste) {
                $mensagemAlerta = "Já existe outro grupo com o nome '{$nome}'!";
                $tipoAlerta = 'warning';
            } else {
                try {
                    $stmtUp = $pdo->prepare("UPDATE grupos SET nome = :nome, descricao = :descricao, status = :status, dataCriacao = :dataCriacao WHERE id = :id");
                    $stmtUp->execute([
                        ':nome' => $nome,
                        ':descricao' => $descricao,
                        ':status' => $status,
                        ':dataCriacao' => $dataCriacao,
                        ':id' => $id
                    ]);
                    $stmtUp->closeCursor();
                    $stmtUp = null;

                    header("Location: grupos.php?msg=" . urlencode("Grupo '{$nome}' atualizado com sucesso no SQLite!") . "&tipo=success");
                    exit;
                } catch (PDOException $e) {
                    $mensagemAlerta = "Erro ao atualizar grupo: " . $e->getMessage();
                    $tipoAlerta = 'danger';
                }
            }
        }
    }
}

// Popula dados iniciais caso a tabela esteja vazia
try {
    $stmtCount = $pdo->query("SELECT COUNT(*) AS total FROM grupos");
    $totalAtual = $stmtCount->fetchColumn();
    $stmtCount->closeCursor();
    $stmtCount = null;

    if ($totalAtual == 0) {
        $stmtInsert = $pdo->prepare("INSERT INTO grupos (nome, descricao, status, dataCriacao) VALUES (:nome, :descricao, :status, :dataCriacao)");
        foreach ($gruposPadrao as $g) {
            $stmtInsert->execute($g);
        }
        $stmtInsert->closeCursor();
        $stmtInsert = null;
    }
} catch (Exception $e) {
}

// Mensagens passadas via GET
if (isset($_GET['msg'])) {
    $mensagemAlerta = htmlspecialchars($_GET['msg']);
    $tipoAlerta = htmlspecialchars($_GET['tipo'] ?? 'success');
}

// Modo Edição: verifica se veio ?editar=ID
$grupoEmEdicao = null;
if (isset($_GET['editar'])) {
    $idEdit = filter_input(INPUT_GET, 'editar', FILTER_VALIDATE_INT);
    if ($idEdit) {
        $stmtEdit = $pdo->prepare("SELECT * FROM grupos WHERE id = :id");
        $stmtEdit->execute([':id' => $idEdit]);
        $grupoEmEdicao = $stmtEdit->fetch();
        $stmtEdit->closeCursor();
        $stmtEdit = null;
    }
}

// Filtros de busca (GET)
$filtroBusca = trim($_GET['busca'] ?? '');
$filtroStatus = $_GET['status'] ?? 'todos';

// Montagem da query de listagem com SQLite
$sql = "SELECT * FROM grupos WHERE 1=1";
$params = [];

if (!empty($filtroBusca)) {
    $sql .= " AND (nome LIKE :busca OR descricao LIKE :busca OR CAST(id AS TEXT) LIKE :busca)";
    $params[':busca'] = "%{$filtroBusca}%";
}

if ($filtroStatus === 'ativo' || $filtroStatus === 'inativo') {
    $sql .= " AND status = :status";
    $params[':status'] = $filtroStatus;
}

$sql .= " ORDER BY id ASC";
$stmtLista = $pdo->prepare($sql);
$stmtLista->execute($params);
$grupos = $stmtLista->fetchAll();
$stmtLista->closeCursor();
$stmtLista = null;

// Estatísticas
$qTot = $pdo->query("SELECT COUNT(*) FROM grupos");
$totalRegistros = $qTot->fetchColumn();
$qTot->closeCursor();
$qTot = null;

$qAtiv = $pdo->query("SELECT COUNT(*) FROM grupos WHERE status = 'ativo'");
$totalAtivos = $qAtiv->fetchColumn();
$qAtiv->closeCursor();
$qAtiv = null;

$qInat = $pdo->query("SELECT COUNT(*) FROM grupos WHERE status = 'inativo'");
$totalInativos = $qInat->fetchColumn();
$qInat->closeCursor();
$qInat = null;

// Formatação de data
function formatarDataBr($data)
{
    if (!$data)
        return '-';
    $p = explode('-', $data);
    return (count($p) === 3) ? "{$p[2]}/{$p[1]}/{$p[0]}" : $data;
}
?>
<!doctype html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Bootstrap 5.3.8 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous" />

    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />

    <!-- Estilos do Projeto -->
    <link rel="stylesheet" href="./grupos.css" />
    <link rel="shortcut icon" href="./assets/img/favicon/favicon-cake.png" type="image/png" />

    <title>Doceria da Vovó Maria - Grupos (PHP + SQLite Nativo)</title>
</head>

<body class="container min-vh-100 d-flex flex-column py-3">

    <!-- CABEÇALHO -->
    <header
        class="d-flex justify-content-between align-items-center mb-3 p-3 gap-3 rounded-4 container tema-fundo-creme tema-borda">
        <div class="logo-container d-inline rounded-circle p-1">
            <img src="./assets/img/logo/logo-ia-600px.jpg" class="img-fluid rounded-circle"
                alt="Logo Doceria da Vovó Maria" />
        </div>

        <div class="flex-grow-1 text-center titulo-box rounded-pill py-2 px-3">
            <h1 class="h3 m-0 fw-bold">GRUPOS DE PRODUTOS</h1>
            <small class="text-white-50">Doceria da Vovó Maria &bull; PHP + SQLite Nativo (Sem programas
                externos)</small>
        </div>

        <div class="d-flex flex-column align-items-end gap-1">
            <span class="badge bg-success shadow-sm">
                <i class="bi bi-filetype-php me-1"></i> PHP + PDO SQLite
            </span>
            <a href="./menu.html" class="btn btn-sm btn-outline-danger fw-semibold d-flex align-items-center gap-1">
                <i class="bi bi-arrow-left-circle"></i> Menu
            </a>
        </div>
    </header>

    <!-- MENSAGEM DE ALERTA / FEEDBACK -->
    <?php if (!empty($mensagemAlerta)): ?>
        <div class="alert alert-<?= $tipoAlerta ?> alert-dismissible fade show text-center shadow-sm" role="alert">
            <strong><?= $tipoAlerta === 'success' ? '✓' : ($tipoAlerta === 'danger' ? '✖' : 'ℹ') ?></strong>
            <?= $mensagemAlerta ?>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    <?php endif; ?>

    <!-- CORPO PRINCIPAL -->
    <main class="container rounded-4 p-3 tema-fundo-creme tema-borda flex-grow-1 d-flex flex-column gap-3">

        <!-- RESUMO / ESTATÍSTICAS -->
        <section id="estatisticas-container" class="row g-2 justify-content-center">
            <div class="col-4 col-md-3">
                <div class="stat-card">
                    <div class="numero"><?= $totalRegistros ?></div>
                    <div class="small text-muted fw-bold">Total Grupos</div>
                </div>
            </div>
            <div class="col-4 col-md-3">
                <div class="stat-card">
                    <div class="numero text-success"><?= $totalAtivos ?></div>
                    <div class="small text-muted fw-bold">Ativos</div>
                </div>
            </div>
            <div class="col-4 col-md-3">
                <div class="stat-card">
                    <div class="numero text-danger"><?= $totalInativos ?></div>
                    <div class="small text-muted fw-bold">Inativos</div>
                </div>
            </div>
        </section>

        <!-- FORMULÁRIO DE CADASTRO OU EDIÇÃO -->
        <section class="rounded-3 p-3 tema-painel text-white shadow-sm">
            <div class="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom border-light-subtle">
                <h2 class="h5 m-0 fw-bold">
                    <i class="bi <?= $grupoEmEdicao ? 'bi-pencil-square' : 'bi-folder-plus' ?> me-1"></i>
                    <?= $grupoEmEdicao ? "Editando Grupo: #{$grupoEmEdicao['id']} - " . htmlspecialchars($grupoEmEdicao['nome']) : 'Cadastrar Novo Grupo' ?>
                </h2>
                <span class="badge bg-light text-dark">SQLite Nativo</span>
            </div>

            <form method="POST" action="grupos.php" class="bg-transparent p-0">
                <input type="hidden" name="acao" value="<?= $grupoEmEdicao ? 'salvar_edicao' : 'incluir' ?>" />
                <?php if ($grupoEmEdicao): ?>
                    <input type="hidden" name="id" value="<?= $grupoEmEdicao['id'] ?>" />
                <?php endif; ?>

                <div class="row g-3">
                    <!-- Código do Grupo -->
                    <div class="col-12 col-md-2">
                        <label class="form-label fw-semibold text-white">Código (ID)</label>
                        <input type="text" class="form-control"
                            value="<?= $grupoEmEdicao ? $grupoEmEdicao['id'] : 'Auto' ?>" readonly
                            style="background-color: #f0ebe1; cursor: not-allowed;" />
                    </div>

                    <!-- Nome do Grupo -->
                    <div class="col-12 col-md-5">
                        <label for="nome" class="form-label fw-semibold text-white">
                            Nome do Grupo <span class="text-warning">*</span>
                        </label>
                        <input type="text" class="form-control" id="nome" name="nome" required
                            value="<?= $grupoEmEdicao ? htmlspecialchars($grupoEmEdicao['nome']) : '' ?>"
                            placeholder="Ex: Bolos e Tortas, Pudins, Quitandas..." />
                    </div>

                    <!-- Status -->
                    <div class="col-12 col-md-2">
                        <label for="status" class="form-label fw-semibold text-white">Status</label>
                        <select id="status" name="status" class="form-select">
                            <option value="ativo" <?= ($grupoEmEdicao && $grupoEmEdicao['status'] === 'ativo') ? 'selected' : '' ?>>Ativo</option>
                            <option value="inativo" <?= ($grupoEmEdicao && $grupoEmEdicao['status'] === 'inativo') ? 'selected' : '' ?>>Inativo</option>
                        </select>
                    </div>

                    <!-- Data de Cadastro -->
                    <div class="col-12 col-md-3">
                        <label for="dataCriacao" class="form-label fw-semibold text-white">Data de Cadastro</label>
                        <input type="date" class="form-control" id="dataCriacao" name="dataCriacao"
                            value="<?= $grupoEmEdicao ? $grupoEmEdicao['dataCriacao'] : date('Y-m-d') ?>" />
                    </div>

                    <!-- Descrição -->
                    <div class="col-12">
                        <label for="descricao" class="form-label fw-semibold text-white">Descrição / Produtos
                            Relacionados</label>
                        <input type="text" class="form-control" id="descricao" name="descricao"
                            value="<?= $grupoEmEdicao ? htmlspecialchars($grupoEmEdicao['descricao']) : '' ?>"
                            placeholder="Ex: Bolos caseiros, confeitados, recheados..." />
                    </div>
                </div>

                <!-- Botões de ação do formulário -->
                <div
                    class="d-flex justify-content-between align-items-center mt-3 pt-2 border-top border-light-subtle flex-wrap gap-2">
                    <div class="d-flex gap-2">
                        <button type="submit"
                            class="btn <?= $grupoEmEdicao ? 'btn-primary' : 'btn-success' ?> px-4 fw-semibold">
                            <i class="bi <?= $grupoEmEdicao ? 'bi-check-circle' : 'bi-plus-circle' ?> me-1"></i>
                            <?= $grupoEmEdicao ? 'Salvar Alterações no SQLite' : 'Incluir Grupo no SQLite' ?>
                        </button>
                        <?php if ($grupoEmEdicao): ?>
                            <a href="grupos.php" class="btn btn-secondary px-3 fw-semibold">
                                <i class="bi bi-x-circle me-1"></i> Cancelar Edição
                            </a>
                        <?php endif; ?>
                    </div>

                    <a href="grupos.php" class="btn btn-warning px-3 fw-semibold">
                        <i class="bi bi-eraser me-1"></i> Limpar Formulário
                    </a>
                </div>
            </form>
        </section>

        <!-- BARRA DE FILTRO E PESQUISA COM RESET DE IDS -->
        <section id="filtros-container" class="rounded-3 p-3 border">
            <form method="GET" action="grupos.php" class="row g-2 align-items-center m-0 p-0">
                <div class="col-12 col-md-5">
                    <div class="input-group">
                        <span class="input-group-text bg-white"><i class="bi bi-search"></i></span>
                        <input type="text" name="busca" class="form-control"
                            value="<?= htmlspecialchars($filtroBusca) ?>"
                            placeholder="Buscar por código, nome ou descrição..." />
                    </div>
                </div>
                <div class="col-12 col-md-3">
                    <select name="status" class="form-select" onchange="this.form.submit()">
                        <option value="todos" <?= $filtroStatus === 'todos' ? 'selected' : '' ?>>Todos os status</option>
                        <option value="ativo" <?= $filtroStatus === 'ativo' ? 'selected' : '' ?>>Apenas Ativos</option>
                        <option value="inativo" <?= $filtroStatus === 'inativo' ? 'selected' : '' ?>>Apenas Inativos
                        </option>
                    </select>
                </div>
                <div class="col-12 col-md-4 text-md-end d-flex justify-content-md-end gap-2 flex-wrap">
                    <button type="submit" class="btn btn-info text-white btn-sm px-3 fw-semibold">
                        <i class="bi bi-filter"></i> Filtrar
                    </button>
                    <?php if (!empty($filtroBusca) || $filtroStatus !== 'todos'): ?>
                        <a href="grupos.php" class="btn btn-outline-secondary btn-sm" title="Limpar Filtros">
                            <i class="bi bi-x"></i> Limpar Busca
                        </a>
                    <?php endif; ?>
                </div>
            </form>
        </section>

        <!-- TABELA DE RESULTADOS DO SQLITE -->
        <section id="resultado-container" class="flex-grow-1 p-2 rounded-3 border">
            <div class="d-flex justify-content-between align-items-center mb-2 px-1 flex-wrap gap-2">
                <div>
                    <h3 class="h6 m-0 fw-bold tema-texto-escuro">
                        <i class="bi bi-database me-1"></i> Tabela SQLite: <code>grupos</code>
                    </h3>
                    <small class="text-muted">Total exibido: <?= count($grupos) ?> grupo(s)</small>
                </div>

                <!-- Botão de Recriar Banco e Resetar IDs -->
                <form method="POST" action="grupos.php"
                    onsubmit="return confirm('⚠️ ATENÇÃO: Recriar Banco e Resetar IDs!\n\nEsta ação irá recriar a tabela no SQLite e reiniciar os IDs a partir do 1.\n\nDeseja continuar?');"
                    class="m-0">
                    <input type="hidden" name="acao" value="resetar_ids" />
                    <button type="submit" class="btn btn-danger btn-sm fw-semibold"
                        title="Recria a tabela e zera a contagem de IDs">
                        <i class="bi bi-arrow-repeat me-1"></i> Recriar Banco (Resetar IDs)
                    </button>
                </form>
            </div>

            <div class="table-responsive">
                <table class="table table-hover table-bordered table-grupos mb-0 align-middle">
                    <thead>
                        <tr>
                            <th style="width: 80px;">ID (PK)</th>
                            <th style="min-width: 180px;">Nome do Grupo</th>
                            <th>Descrição / Observações</th>
                            <th style="width: 110px;">Status</th>
                            <th style="width: 120px;">Data</th>
                            <th style="width: 170px;">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if (empty($grupos)): ?>
                            <tr>
                                <td colspan="6" class="text-center text-muted py-4">
                                    <i class="bi bi-exclamation-triangle me-1"></i> Nenhum grupo encontrado para os filtros
                                    selecionados.
                                </td>
                            </tr>
                        <?php else: ?>
                            <?php foreach ($grupos as $g): ?>
                                <tr>
                                    <td class="text-center fw-bold">#<?= $g['id'] ?></td>
                                    <td class="fw-semibold text-capitalize"><?= htmlspecialchars($g['nome']) ?></td>
                                    <td class="text-muted small"><?= htmlspecialchars($g['descricao'] ?: 'Sem descrição') ?>
                                    </td>
                                    <td class="text-center">
                                        <span class="<?= $g['status'] === 'ativo' ? 'badge-ativo' : 'badge-inativo' ?>">
                                            <?= $g['status'] === 'ativo' ? 'Ativo' : 'Inativo' ?>
                                        </span>
                                    </td>
                                    <td class="text-center small"><?= formatarDataBr($g['dataCriacao']) ?></td>
                                    <td class="text-center">
                                        <div class="d-flex justify-content-center gap-2">
                                            <!-- Botão Editar -->
                                            <a href="grupos.php?editar=<?= $g['id'] ?>" class="btn btn-sm btn-primary btn-acao"
                                                title="Editar este grupo">
                                                <i class="bi bi-pencil-square"></i> Editar
                                            </a>

                                            <!-- Formulário Excluir -->
                                            <form method="POST" action="grupos.php"
                                                onsubmit="return confirm('Deseja realmente excluir o grupo \'<?= addslashes(htmlspecialchars($g['nome'])) ?>\' (ID #<?= $g['id'] ?>)?');"
                                                class="d-inline m-0">
                                                <input type="hidden" name="acao" value="excluir" />
                                                <input type="hidden" name="id" value="<?= $g['id'] ?>" />
                                                <button type="submit" class="btn btn-sm btn-danger btn-acao"
                                                    title="Excluir este grupo">
                                                    <i class="bi bi-trash"></i> Excluir
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </section>

    </main>

    <!-- RODAPÉ E NAVEGAÇÃO RÁPIDA -->
    <footer class="container mt-3 p-2 rounded-4 tema-fundo-creme tema-borda">
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 px-2">
            <small class="tema-texto-escuro fw-semibold">
                &copy; Doceria da Vovó Maria - Confeitaria PHP + SQLite Nativo
            </small>

            <div class="d-flex gap-2">
                <a href="../produto.html" class="btn btn-sm btn-outline-dark">
                    <i class="bi bi-box-seam me-1"></i> Produtos
                </a>
                <a href="../vendas.html" class="btn btn-sm btn-outline-dark">
                    <i class="bi bi-cash-coin me-1"></i> Vendas
                </a>
                <a href="../menu.html" class="btn btn-sm btn-danger">
                    <i class="bi bi-door-open me-1"></i> Sair para Menu
                </a>
            </div>
        </div>
    </footer>

    <!-- Bootstrap 5 Bundle JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>
