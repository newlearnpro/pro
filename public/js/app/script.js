app.directive('usersTable', function($http) {
    return {
        restrict: 'EA',
        //  scope: {},
        replace: true,
        link: function(scope, element, attrs, ctrl) {
            $http({
                method: 'POST',
                url: '../admin/users_info',
                // data: {
                //     'users': "username"
                // }
            }).
            success(function(data) {
                scope.users = data;
            });
        },
        templateUrl: '../../public/partials/templates/users_tmpl.html'
    }
});

app.controller('contactsCtrl', function($scope, $http) {
    $scope.recipient = '';
    $scope.selectUser = function(param) {
        $scope.recipient = param;
        var username = document.querySelector("#username").innerHTML;
        var data = {
            'sender': username,
            'recipient': $scope.recipient,
        };
        // setInterval(function() {
        $http({
            method: 'POST',
            url: '../main/load_message',
            data: {
                'message_box': data
            }
        }).
        success(function(data) {
            var list = document.querySelector("#list")
            while (list.hasChildNodes()) {
                list.removeChild(list.lastChild);
            }

            for (var i = 0; i < data.length; i++) {
                var div = document.createElement('option');
                // div.className = "alert alert-success";
                div.innerHTML = data[i].sender + " : " + data[i].message;
                document.querySelector("#list").appendChild(div);
            }


        });
        //}, 5000);
    }
    $scope.sendMessage = function() {
        var message_text = document.querySelector("#message_text").value;
        var username = document.querySelector("#username").innerHTML;
        var div = document.createElement('div');
        var data = {
            'sender': username,
            'recipient': $scope.recipient,
            'message': message_text
        };
        $http({
            method: 'POST',
            url: '../main/send_message',
            data: {
                'message_box': data
            }
        }).
        success(function(data) {
            // console.log(data);
        });
    }
});


app.controller('usersCtrl', function($scope, $http, $q, language) {
    var promise = language.getLang();
    promise.then(function(data) {
        $scope.language = data;
    });








    $scope.selectUser = function(param) {
        $http({
            method: 'POST',
            url: '../admin/load_position',
        }).success(function(data) {
            $scope.position = data;
            //  console.log(data);
            //  $scope.userField = data[0];
            //   console.log(data);
        });


        $http({
            method: 'POST',
            url: '../admin/users_info',
            data: {
                'users': param
            }
        }).
        success(function(data) {
            $scope.userField = data[0];
            //console.log($scope.userField);

        });
    }
    $scope.editUser = function() {
        $http({
            method: 'POST',
            url: '../admin/users_change',
            data: {
                'edit_user': {
                    login: $scope.userField.username,
                    username: document.querySelector("#userName").value,
                    first_name: document.querySelector("#firstName").value,
                    //  last_name: document.querySelector("#lastName").value,
                    position: document.querySelector("#position").firstElementChild.getAttribute("ng-selected")

                }
            }
        }).
        success(function(data) {

        });
    }
});


app.directive('positionGroup', function($http, $q, $timeout, language) {
    return {
        restrict: 'EA',
        replace: true,
        template: "<div></input type='button' value='bebe'/></div>",
        //scope: {},
        link: function(scope, element, attrs, ctrl) {
            var promise = language.getLang();
            promise.then(function(data) {
                scope.language = data;
                scope.loadPosition(scope, element);
                scope.createPosition(scope, element);
            });
            scope.loadPosition = function() {
                $http({
                    method: 'GET',
                    url: 'load_position',

                }).
                success(function(data, status) {

                    scope.position = data;


                    //  console.log(data)



                    element.append('<div class="mainPosition"></div>');
                    for (let i = 0; i < data.length; i++) {
                        $(".mainPosition").append('<div class="position1" data1="' + data[i].id + '" data2="' + data[i].parent_id + '"><input type="text" value="' + data[i].position + '"/><a class="btn btn-danger btn-xs" ng-click="scope.removePosition()">remove</a></div>');

                        //if ($('.position1[dat2^="46"]') != undefined) {

                        //  }
                        $('.mainPosition div[data2^="' + i + '"]').appendTo(".mainPosition div[data1^='" + i + "']").removeClass("position1").addClass("position2");

                    }



                    //  $('.mainPosition div[data2^="46"]').appendTo(".mainPosition div[data1^='46']").removeClass("position1").addClass("position2");
                    // setTimeout(function() {
                    //  $('.mainPosition div[data2^="54"]').appendTo(".mainPosition div[data1^='54']").removeClass("position1").addClass("position2");
                    //  $('.mainPosition div[data2^="62"]').appendTo(".mainPosition div[data1^='62']").removeClass("position1").addClass("position2");
                    //console.log($('.position1[dat2^="54"]')[0]);
                    //  }, 500);



                    /*   element.append('<div class="mainPosition"></div>');
                       var myEl = angular.element(document.querySelector('.mainPosition'));
                       // console.log(myEl);
                       for (let i = 0; i < data.length; i++) {
                           // if (data[i].parent_id == 0) {
                           myEl.append('<div class="position1" dat="' + data[i].id + '" dat2="' + data[i].parent_id + '"><input type="text" value="' + data[i].position + '"/><a class="btn btn-danger btn-xs" ng-click="scope.removePosition()">remove</a></div>');


                           //getAttribute("dat2")

                           //   }

                       }
                       //.getAttribute("dat")
                       var myEl2 = angular.element(document.querySelector('.position1'));
                       for (var j = 0; j < 5; j++) {
                           console.log(myEl2[j]);

                           myEl2.append("<input>");
                       }*/

                    /*
                                            var strPosition2 = data[i].position2;
                                            var res = strPosition2.split("|");
                                            //    console.log(res);




                                            for (let j = 0; j < res.length; j++) {
                                                // if (res[j] != "") {
                                                myEl.append('<div class="position2"><input type="text" value="' + res[j] + '"/><a class="btn btn-danger btn-xs" ng-click="scope.removePosition()">remove</a></div>');
                                                // }


                                                var strPosition3 = data[i].position3;
                                                var res2 = strPosition3.split("|");
                                                //var res22 = res2[i].split(",");

                                                //  console.log(res2[k])


                                                console.log(typeof(res2[j]));

                                                //  for (let k = 0; k < res22.length; k++) {

                                                myEl.append('<div class="position3"><input type="text" value="' + res2[j] + '"/><a class="btn btn-danger btn-xs" ng-click="scope.removePosition()">remove</a></div>');

                                                // }

                                            }


                                        }

                    */







                    //    }
                    //   }, 500);



                    /*  data.bind("click", function() {
                          alert("fg");
                      });*/
                    //console.log(data);
                    //if(){
                    // element.after("<input />");

                    /*  element.append('<div class="aaa0"></div>');


                    var arr_parrent_id = [];
                    var arr_id = [];
*/


                    /*     var node = document.createElement("LI");
                    var textnode = document.createTextNode("Water");
                    node.appendChild(textnode);
                    document.getElementById("myList").appendChild(node);
*/
                    /*  var myEl = angular.element(document.querySelector('.aaa0'));
                      console.log(myEl[0])

                      for (var i = 0; i < data.length; i++) {
                          //    arr_id.push(data[i].id);
                          //arr_id_div.push('<div dat="' + data[i].id + '" class="bbb' + data[i].parent_id + '"><input type="text" value="' + data[i].position + '"/><a class="btn btn-danger btn-xs" ng-click="scope.removePosition()">remove</a></div>');
                          //    console.log(myEl);
                          //   arr_parrent_id.push(data[i].parent_id);
                          //    arr_parrent_id_div.push('<div dat="' + data[i].id + '" class="bbb' + data[i].parent_id + '"><input type="text" value="' + data[i].position + '"/><a class="btn btn-danger btn-xs" ng-click="scope.removePosition()">remove</a></div>');
                          //    console.log(arr_parrent_id);



                          //if (data[i].parent_id == 0) {

                          myEl.append('<div dat="' + data[i].id + '" dat2="' + data[i].parent_id + '"><input type="text" value="' + data[i].position + '"/><a class="btn btn-danger btn-xs" ng-click="scope.removePosition()">remove</a></div>');

                      }
                      console.log(myEl.children()[0]);
                      myEl.children()[0].remove()
                      console.log(myEl.children()[0]);*/
                    /* for (var j = 0; j < arr_parrent_id.length; j++) {
                         if (arr_parrent_id[i] == arr_id[j]) {
                             //         console.log(i + 1, j + 1);
                             // console.log(myEl);
                             //  myEl[0].childNodes[0].append('<div style="margin-left:50px" dat="' + data[i].id + '" class="' + data[i].parent_id + '"><input type="text" value="' + data[i].position + '"/><a class="btn btn-danger btn-xs" ng-click="scope.removePosition()">remove</a></div>');
                             // myEl.append('<div style="margin-left:50px" dat="' + data[i].id + '" class="' + data[i].parent_id + '"><input type="text" value="' + data[i].position + '"/><a class="btn btn-danger btn-xs" ng-click="scope.removePosition()">remove</a></div>');
                         }
                     }*/
                    //    }




                    //  this.find = function(array, value) {
                    //  for (var i = 0; i < arr_parrent_id.length; i++) {
                    /*      for (var j = 0; j < arr_parrent_id.length; j++) {
                              if (arr_parrent_id[i] == arr_id[j]) {
                                  console.log(i);
                                  myEl.append('<div style="margin-left:20px" dat="' + data[i].id + '" class="' + data[i].parent_id + '"><input type="text" value="' + data[i].position + '"/><a class="btn btn-danger btn-xs" ng-click="scope.removePosition()">remove</a></div>');
                              }
                          }*/
                    //}





                    //   console.log(element[0].lastChild.getElementsByClassName("bbb" + "9")[0]);
                    /*    console.log(arr_id);
                        console.log(arr_parrent_id);

                        var newLi = document.querySelector('.aaa0');
                        $timeout(function() {
                            // console.log(arr_id_div[0].toString)
                            //   arr_id_div[0].toString.appendChild(arr_parrent_id_div[0].toString);
                            // newLi.children[1].appendChild(element[0].lastChild.children[4]);
                            //    newLi.children[1].appendChild(element[0].lastChild.children[4]);
                            //  console.log(document.getElementsByName('dat'));

                            for (var t = 0; t < data.length; t++) {
                                //  console.log(element[0].lastChild.children[t].getAttribute("dat2"));
                                // console.log(element[0].lastChild.children[t].attributes);
                                //   console.log(element[0].lastChild.children[t]);
                                //  console.log(element[0].lastChild.children[t].getAttribute("dat2"));
                                for (var t2 = 0; t2 < data.length; t2++) {

                                    if (arr_parrent_id[t] == arr_id[t2]) {
                                        console.log(t, t2);
                                        newLi.children[t2].appendChild(element[0].lastChild.children[t]);
                                        // myEl.append('<div style="margin-left:20px" dat="' + data[i].id + '" class="' + data[i].parent_id + '"><input type="text" value="' + data[i].position + '"/><a class="btn btn-danger btn-xs" ng-click="scope.removePosition()">remove</a></div>');
                                    }

                                }


                            }


                        }, 500);*/


                });
            }
            scope.createPosition = function() {
                element.append('<input id="position_text" type="text" /><button id="position_add">OK</button>');
                element.find("button").bind("click", function() {
                    var arr = [];
                    var position_name = document.querySelector('#position_text').value;
                    var x = document.querySelector("#position").selectedIndex;
                    var parent_id = document.getElementsByTagName("option")[x].getAttribute("ng-selected");

                    arr.push(position_name);
                    $http({
                        method: 'POST',
                        url: 'create_position',
                        data: {
                            'position': arr,
                            'parent_id': parent_id
                        }
                    }).
                    success(function(data) {
                        scope.loadPosition();
                    });
                });
            }
            scope.removePosition = function() {
                alert("df");
                $http({
                    method: 'POST',
                    url: '../admin/remove_position',
                    data: {
                        'position': this.items.id
                    }
                }).success(function(data) {
                    scope.loadPosition();
                });
                console.log(this.items);
            }
            scope.addPosition = function(index) {
                // console.log(this.$index);

                //  console.log(index);
                //  console.log(document.querySelector('#addpos').parentNode.indexOf(0))

                var nodeList = document.querySelectorAll('.addpos');

                //  element = nodeList[index];
                // var index = Array.prototype.indexOf.call(nodeList, element);
                console.log(element);

                //element.after('<div><input id="pos_text" type="text" /><button id="pos_add">OK</button></div>');
                element.after("<input />");









            }

        }
    }
});



app.controller('classCtrl', function($scope, $http, $q, language) {
    /*var promise = language.getLang();
    promise.then(function(data) {
        $scope.language = data;
    });




    $http({
        method: 'POST',
        url: '../admin/users_info',

    }).
    success(function(data) {
        $scope.userField = data[0];
        //console.log($scope.userField);

    });*/


});