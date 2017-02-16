var proj5 = angular.module("proj5", []);

proj5.controller("signupController", function($scope){

  $scope.user = {};
  $scope.userValidity = {};
  $scope.showSignup = false;

  //user validation form - initialisation
  $scope.userValidity.username        = false;
  $scope.userValidity.firstname       = false;
  $scope.userValidity.lastname        = false;
  $scope.userValidity.email           = false;
  $scope.userValidity.password        = false;
  $scope.userValidity.passwordRepeat  = false;
  $scope.userValidity.validity        = false;


  $scope.validateUsername = function(){
    if($scope.user.username != null && $scope.user.username.length >= 6 && $scope.user.username.length <= 24){
      $scope.userValidity.username = true;
    }
    else{
      $scope.userValidity.username = false;
    }
    $scope.validation();
  }

  $scope.validateFirstname = function(){
    if($scope.signupForm['user[firstname]'].$valid){
      $scope.userValidity.firstname = true;
    }
    else{
      $scope.userValidity.firstname = false;
    }
    $scope.validation();
  }

  $scope.validateLastname = function(){
    if($scope.signupForm['user[lastname]'].$valid){
      $scope.userValidity.lastname = true;
    }
    else{
      $scope.userValidity.lastname = false;
    }
    $scope.validation();
  }

  $scope.validateEmail = function(){
    if($scope.signupForm['user[email]'].$valid){
      $scope.userValidity.email = true;
    }
    else{
      $scope.userValidity.email = false;
    }
    $scope.validation();
  }

  $scope.validatePassword = function(){

    if($scope.user.password != null && $scope.user.password.length >= 6 && $scope.user.password.length <= 12){
      $scope.userValidity.password = true;
    }
    else{
      $scope.userValidity.password = false;
    }
    $scope.validation();
  }

  $scope.validatePasswordRepeat = function(){
    if($scope.user.passwordRepeat != null && $scope.user.password === $scope.user.passwordRepeat){
      $scope.userValidity.passwordRepeat = true;
    }
    else{
      $scope.userValidity.passwordRepeat = false;
    }
    $scope.validation();
  }

  $scope.validation = function(){
    console.clear();
    console.log($scope.userValidity.username);
    console.log($scope.userValidity.firstname);
    console.log($scope.userValidity.lastname);
    console.log($scope.userValidity.email);
    console.log($scope.userValidity.password);
    console.log($scope.userValidity.passwordRepeat);

    if($scope.userValidity.username && $scope.userValidity.firstname && $scope.userValidity.lastname &&
        $scope.userValidity.email && $scope.userValidity.password && $scope.userValidity.passwordRepeat)
    {
      console.log("TRUE");
      $scope.showSignup = true;
    }
    else {
      console.log("FALSE");
      $scope.showSignup = false;
    }
  }


});
