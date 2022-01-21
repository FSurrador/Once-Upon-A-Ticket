<?php
$str = "dbname=lab user=postgres password=Zssifjgp2 host=localhost
port=5432";
$connection = pg_connect($str);
if (!$connection) {
    die("Erro na ligacao");
}
echo "Ligacao estabelecida!";
// do something here


var_dump(file_get_contents('php://input'));

pg_close($connection);
//header("Location: connection2.php");

?>
