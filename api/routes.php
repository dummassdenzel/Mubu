<?php
$allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:4200',
];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: " . $origin);
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");
}

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

/*API Endpoint Router*/

require_once "./modules/get.php";
require_once "./modules/post.php";
require_once "./modules/delete.php";
require_once "./config/database.php";
require_once "./vendor/autoload.php";
require_once "./src/Jwt.php";
require_once "./src/AuthMiddleware.php";

// INITIALIZE ESSENTIAL OBJECTS
$con = new Connection();
$pdo = $con->connect();
$get = new Get($pdo);
$post = new Post($pdo);
$delete = new Delete($pdo);
$auth = new AuthMiddleware();


// Check if 'request' parameter is set in the request
if (isset($_REQUEST['request'])) {
    // Split the request into an array based on '/'
    $request = explode('/', $_REQUEST['request']);
} else {
    // If 'request' parameter is not set, return a 404 response
    echo "Not Found";
    http_response_code(404);
}

// THIS IS THE MAIN SWITCH STATEMENT
switch ($_SERVER['REQUEST_METHOD']) {
    case 'OPTIONS':
        http_response_code(200);
        exit();

    case 'GET':
        switch ($request[0]) {
            case 'users':
                // ENDPOINT PROTECTION
                // $user = $auth->authenticateRequest();
                if (count($request) > 1) {
                    echo json_encode($get->get_users($request[1]));
                } else {
                    echo json_encode($get->get_users());
                }
                break;
            case 'products':
                // ENDPOINT PROTECTION
                // $user = $auth->authenticateRequest();
                if (count($request) > 1) {
                    echo json_encode($get->get_products($request[1]));
                } else {
                    echo json_encode($get->get_products());
                }
                break;

            case 'orders':
                if (count($request) > 1) {
                    // Get specific order by ID
                    echo json_encode($get->get_orders($request[1]));
                } else {
                    // Get all orders
                    echo json_encode($get->get_orders());
                }
                break;


            default:
                // RESPONSE FOR UNSUPPORTED REQUESTS
                echo "No Such Request";
                http_response_code(403);
                break;
        }
        break;


    case 'POST':
        // Check the Content-Type header
        $contentType = $_SERVER['CONTENT_TYPE'] ?? '';

        if (strpos($contentType, 'application/json') !== false) {
            // Handle JSON data
            $data = json_decode(file_get_contents("php://input"));
            // Process JSON data
        } elseif (strpos($contentType, 'multipart/form-data') !== false) {
            // Handle form data
            $data = $_POST;
            $files = $_FILES;
            // Process form data and files
        } else {
            // Unsupported content type
            echo "Unsupported Content Type";
            http_response_code(415);
            exit();
        }
        switch ($request[0]) {

            case 'adduser':
                echo json_encode($post->addUser($data));
                break;

            case 'login':
                echo json_encode($post->userLogin($data));
                break;

            case 'orders':
                echo json_encode($post->createOrder($data));
                break;

            case 'payment-proof':
                echo json_encode($post->uploadPaymentProof($_POST, $_FILES));
                break;



            default:
                // RESPONSE FOR UNSUPPORTED REQUESTS
                echo "No Such Request";
                http_response_code(403);
                break;
        }
        break;

    case 'DELETE':
        switch ($request[0]) {


            default:
                // Return a 403 response for unsupported requests
                echo "No Such Request";
                http_response_code(403);
                break;
        }
        break;

    default:
        // Return a 404 response for unsupported HTTP methods
        echo "Unsupported HTTP method";
        http_response_code(404);
        break;
}

