<?php
$str = "dbname=lab user=postgres password=Zssifjgp2 host=localhost
port=5432";
$connection = pg_connect($str);
if (!$connection) {
    die("Erro na ligacao");
}
echo "Ligacao estabelecida!";

if(isset($_POST["moviename"]) || isset($_POST["username"])) {
    $USERNAME = $_POST["username"];
    $USERID = rand(100000, 999999);
    $USERIMG = $_POST['camphoto'];
    //$insert = pg_query($connection, "INSERT into profile VALUES('$USERNAME', '$USERID', '$USERIMG')");

    $MOVIENAME = $_POST['moviename'];
    $TICKETDATAURL=$_POST['ticket'];




}
?>