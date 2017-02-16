var proj5 = angular.module("proj5", ['mentio']);
proj5.controller('pageLayoutController',function($scope, $filter){

  $scope.items = [
  {label : 'sri'},
  {label : 'sachin'},
  {label : 'priya'}];


	$scope.todoQueue   = [];
  $scope.userTodo    = [];
  $scope.completedTasks= [];
  $scope.days        = [];
  $scope.dayselection= "0";
  $scope.showConfirmTime = false;
  $scope.addTask = "";

  $scope.estimatedTime = 0;
  $scope.completedTime = 0;

  $scope.totalEstimatedTime  = 0;
  $scope.totalCompletionTime = 0;

  $scope.totalActiveTasksInQueue = 0;
  $scope.totalCompletedTasks     = 0;

  var date 					 = new Date();
	var weekday		     = [];
  var idString       = "";
  var id_num         = 0;
  var id             = 0;
  var tempday        = 0;

	weekday[0]	 = "Sunday";
	weekday[1]	 = "Monday";
	weekday[2]	 = "Tuesday";
	weekday[3]	 = "Wednesday";
	weekday[4]	 = "Thursday";
	weekday[5]	 = "Friday";
	weekday[6]	 = "Saturday";


  // Find the days
  $scope.weekdayFinder  = function(){
    tempday = date.getDay();

    for(var i=0, j=0; i<5; i++){
      if(tempday+i < 7){
        $scope.days[i] = {day: weekday[tempday+i], tasks: []};
      }
      else {
        $scope.days[i] = {day: weekday[j], tasks: []};
        j++;
      }
    }
  };


  // Add tasks to ToDo Queue
	$scope.add= function() {

    $scope.todoTaskDetails = {};

    var taskTemp = $scope.addTask;
    var startindex = 0;
    var taskSubstring = "";
    var taskSubstringlen = 0;
    var tempString = "";

    $scope.todoTaskDetails.id   = id++;
    $scope.todoTaskDetails.task = $scope.addTask;
    $scope.todoTaskDetails.date = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    $scope.todoTaskDetails.time = $filter('date')(new Date(), 'hh:mm a');
    $scope.todoTaskDetails.createdBy = "";
    $scope.todoTaskDetails.assignedTo = [];
    $scope.todoTaskDetails.estimatedTime = 0;
    $scope.todoTaskDetails.completedTime = 0;


    for(var i=0; i<taskTemp.length; i++)
    {
      if(taskTemp.charAt(i) == '@')
      {
        startindex = i;
        for(var j=startindex; j<taskTemp.length; j++)
        {
          if(taskTemp.charAt(j) == ' ')
          {
            taskSubstringlen = j;
            break;
          }
        }
        taskSubstring = taskTemp.substring(startindex+1, taskSubstringlen);
        $scope.todoTaskDetails.assignedTo.push(taskSubstring);

        taskTemp = taskTemp.replace("@"+taskSubstring+" ","");
        i=0;
      }
    }
    $scope.todoTaskDetails.task = taskTemp;
    console.log($scope.todoTaskDetails.task);

		$scope.todoQueue.push({todoTask : $scope.todoTaskDetails});
    $scope.totalActiveTasksInQueue++;
		$scope.addTask = "";
	};

  // Show Confrim Button in ADD TASK TO USER MODAL BASED ON TIME
  $scope.onChangeTime_addTask = function(){
    $scope.showConfirmTime = false;
    if($scope.estimatedTime>=1 && $scope.estimatedTime<=5){
      $scope.showConfirmTime = true;
    }
    else {
      $scope.showConfirmTime = false;
    }
  }
  // Show Confrim Button in TASK COMPLETION MODAL BASED ON TIME
  $scope.onChangeTime_completeTask = function(){
    $scope.showConfirmTime = false;
    if($scope.completedTime>=1 && $scope.completedTime<10){
      $scope.showConfirmTime = true;
    }
    else {
      $scope.showConfirmTime = false;
    }
  }


  // Add tasks to USER
  $scope.dayselectionevent  = function(event){
      idString = event.target.id;
      id_num = parseInt(idString.substring(7));
  };

  $scope.pushintoUser = function(){
    $scope.todoTaskDetails = {};

    tempday = parseInt($scope.dayselection);

    for(var i=0; i<$scope.todoQueue.length; i++){
      if($scope.todoQueue[i].todoTask.id == id_num){

        $scope.todoTaskDetails.id   = $scope.todoQueue[i].todoTask.id;
        $scope.todoTaskDetails.task = $scope.todoQueue[i].todoTask.task;
        $scope.todoTaskDetails.date = $scope.todoQueue[i].todoTask.date
        $scope.todoTaskDetails.time = $scope.todoQueue[i].todoTask.time;
        $scope.todoTaskDetails.createdBy  = $scope.todoQueue[i].todoTask.createdBy;
        $scope.todoTaskDetails.assignedTo = $scope.todoQueue[i].todoTask.assignedTo;
        $scope.todoTaskDetails.estimatedTime = $scope.estimatedTime;
        $scope.todoTaskDetails.completedTime = 0;

        $scope.todoQueue.splice(i,1);
        break;
      }
    }

    $scope.days[tempday].tasks.push({userTask : $scope.todoTaskDetails});
    $scope.totalActiveTasksInQueue--;

    $scope.reinit();
  };


  // Pull tasks from user to TODO-QUEUE
  $scope.pullfromUser = function(event, tempday){
    idString = event.target.id;
    id_num = parseInt(idString.substring(7));

    $scope.todoTaskDetails = {};

    for(var i=0; i<$scope.days[tempday].tasks.length; i++){
      if($scope.days[tempday].tasks[i].userTask.id == id_num){

        $scope.todoTaskDetails.id   = $scope.days[tempday].tasks[i].userTask.id;
        $scope.todoTaskDetails.task = $scope.days[tempday].tasks[i].userTask.task;
        $scope.todoTaskDetails.date = $scope.days[tempday].tasks[i].userTask.date
        $scope.todoTaskDetails.time = $scope.days[tempday].tasks[i].userTask.time;
        $scope.todoTaskDetails.createdBy  = $scope.days[tempday].tasks[i].userTask.createdBy;
        $scope.todoTaskDetails.assignedTo = $scope.days[tempday].tasks[i].userTask.assignedTo;
        $scope.todoTaskDetails.estimatedTime = 0;
        $scope.todoTaskDetails.completedTime = 0;

        $scope.days[tempday].tasks.splice(i,1);
        break;
      }
    }

    $scope.todoQueue.push({todoTask : $scope.todoTaskDetails});
    $scope.totalActiveTasksInQueue++;

    $scope.reinit();
  };

  // Delete Tasks from TODO-QUEUE
  $scope.deleteTask  = function(event){
    idString = event.target.id;
    id_num = parseInt(idString.substring(7));

    for(var i=0; i<$scope.todoQueue.length; i++){
      if($scope.todoQueue[i].todoTask.id == id_num){
        $scope.todoQueue.splice(i,1);
        break;
      }
    }
    $scope.totalActiveTasksInQueue--;

    $scope.reinit();
  };

  // Task Completion in USERTASKS
  $scope.idFinder  = function(event, tempdayID){
      tempday  = tempdayID;
      idString = event.target.id;
      id_num   = parseInt(idString.substring(7));
  };

  $scope.taskcompletion = function(){

    $scope.todoTaskDetails = {};

    for(var i=0; i<$scope.days[tempday].tasks.length; i++){
      if($scope.days[tempday].tasks[i].userTask.id == id_num){

        $scope.todoTaskDetails.id   = $scope.days[tempday].tasks[i].userTask.id;
        $scope.todoTaskDetails.task = $scope.days[tempday].tasks[i].userTask.task;
        $scope.todoTaskDetails.date = $scope.days[tempday].tasks[i].userTask.date
        $scope.todoTaskDetails.time = $scope.days[tempday].tasks[i].userTask.time;
        $scope.todoTaskDetails.createdBy  = $scope.days[tempday].tasks[i].userTask.createdBy;
        $scope.todoTaskDetails.assignedTo  = $scope.days[tempday].tasks[i].userTask.assignedTo;
        $scope.todoTaskDetails.estimatedTime = $scope.days[tempday].tasks[i].userTask.estimatedTime;
        $scope.todoTaskDetails.completedTime = $scope.completedTime;

        $scope.days[tempday].tasks.splice(i,1);

        $scope.totalEstimatedTime += $scope.todoTaskDetails.estimatedTime;
        $scope.totalCompletionTime += $scope.todoTaskDetails.completedTime;
        break;
      }
    }

    $scope.completedTasks.push({todoTask : $scope.todoTaskDetails});
    $scope.totalCompletedTasks++;

    $scope.reinit();
  };

  $scope.reinit = function(){
    $scope.dayselection= "0";
    $scope.estimatedTime = 0;
    $scope.completedTime = 0;

    var idString       = "";
    var id_num         = 0;
    var tempday        = 0;
  };

});



//Directive for select2


proj5.directive('memberDirective',function(){
    return {
        restrict : 'A',
        link : function(scope){
            $(".memberSelect").select2({
                placeholder : '@email',
                tags : true
            });
        }
    };
});