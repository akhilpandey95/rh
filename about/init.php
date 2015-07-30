<?php
/*
ob_start();
session_start();

# define the parameters required

$db_host = "localhost";
$db_user = "root";
$db_paswd = "akhil";
$db_name = "ghost";

class user
{
	private $db1; # Just a reference
	
	function __construct($db)
	{
		parent::__construct();
		$this -> db1 = $db;
	}

	public function loggedin() {
		if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
			return true;
		}
	}

	public function logout() {
		session_destroy();
	}


}

# Creating a PDO connection 
 	
 	try 
 	{
 	
 	$conn = new PDO("mysql:host = $db_host;dbname=ghost",$db_user,$db_paswd);
 	$conn->setAttribute(PDO::ATTR_ERRMODE , PDO::ERRMODE_EXCEPTION); 
    echo "Created an Instance";     
    } 

   catch(PDOException $ex)
   {
   	echo "Connection Failed : " .$ex->getMessage();  # must make a custom page for this !!REMEMBER
	}



$root = new user($db); 

*/

echo "Testing Init";

?>




?>
