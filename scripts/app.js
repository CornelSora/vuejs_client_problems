$(document).ready(function() {
    var url = 'https://webtech-project-traininghelper-cornelsora.c9users.io';

    var myInterval;

    var topVue = new Vue({
        el: "#section-top",
        data: {
            authenticated: "false"
        },
        methods: {
            logout: function() {
                Cookies.remove("userid");
                window.location.href = "https://webtech-project-traininghelper-cornelsora.c9users.io/index.html";
            },
            onlyMine: function() {
                var userid = Cookies.get("userid");
                var filteredData = [];
                for (var i = 0; i < pbApp.problems.length; i++) {
                    if (pbApp.problems[i].updatedBy == userid) {
                        filteredData.push(pbApp.problems[i]);
                    }
                }
                pbApp.problems = filteredData;
                clearInterval(myInterval);
            },
            allProbs: function() {
                this.$http
                    .get(url + '/problems')
                    .then((response) => {
                        pbApp.problems = response.body;
                        console.log(response.body);
                        myInterval = setInterval(function () {
                          pbApp.verifyChangedData();
                        }.bind(this), 2000); 
                    }, (error) => {
                        alert("You are not authorized to be here!!!");
                        console.log(error);
                    });
            }
        }
    });

    Vue.http.interceptors.push((request, next) => {
        var userid = Cookies.get("userid");
        console.log(userid);
        if (userid) {
            request.headers.set('userid', userid);
        }
        next()
    })

    var pbApp = new Vue({
        el: "#problApp",
        data: {
            problems: [],
            denumirePb: "",
            dificultatePb: "",
            enuntPb: "",
            id: ""
        },
        created: function() {
            this.$http
                .get(url + '/problems')
                .then((response) => {
                    this.problems = response.body;
                    topVue.authenticated = "true";
                    console.log(response.body);
                    myInterval = setInterval(function () {
                      this.verifyChangedData();
                    }.bind(this), 1000); 
                }, (error) => {
                    alert("You are not authorized to be here!!!");
                    console.log(error);
                });
        },
        methods: {
            addPb: function() {
                var problema = {};
                problema.denumire = this.denumirePb;
                problema.continut = this.enuntPb;
                problema.dificultate = this.dificultatePb;
                problema.userid = this.userid;
                problema.id = this.id
                if ($("#btnAddSubmit").val() == "Update") {
                    console.log("aici!")
                    for (var i = 0; i < this.problems.length; i++) {
                        var datas = [];
                        if (this.problems[i].id == this.id) {
                            console.log("found it")
                            this.problems[i].denumire = problema.denumire;
                            this.problems[i].dificultate = problema.dificultate;
                            this.problems[i].continut = problema.continut;
                        }
                    }
                    this.$http.put(url + "/problems/" + this.id, problema, function(response) {
                        alert("Updated!");
                    }, function(error) {
                        alert("Not added!");
                        console.log(error);
                    })
                }
                else {
                    this.problems.push(problema);
                    this.$http.post(url + "/problems", problema, function(response) {
                        alert("Added!");
                    }, function(error) {
                        alert("Not added!");
                        console.log(error);
                    })
                }
                this.denumirePb = "";
                this.enuntPb = "";
                this.dificultatePb = "";
                $('#myModal').fadeOut();
                $("#btnAddSubmit").val("Adauga");
            },
            deletePb: function() {
                console.log("I will try delete");
                this.$http.delete(url + "/problems/" + this.id, function(response) {
                    console.log("done");
                }, function(error) {
                    alert("Not deleted!");
                    console.log(error);
                });
                var tempData = [];
                console.log(this.problems);
                for (var i = 0; i < this.problems.length; i++) {
                    if (this.problems[i].id != this.id) {
                        tempData.push(this.problems[i]);
                    }
                }
                console.log(tempData);
                this.problems = tempData;
                $('#myModal').fadeOut();
            },
            showUpdateDialog: function(problem) {
                this.denumirePb = problem.denumire;
                this.enuntPb = problem.continut;
                this.dificultatePb = problem.dificultate;
                this.id = problem.id;
                $('#myModal').fadeIn();
                $("#btnAddSubmit").val("Update");
            },
            verifyChangedData: function() {
                this.$http
                    .get(url + '/problems')
                    .then((response) => {
                        var data = response.body;
                        pbApp.problems = data;
                    }, (error) => {
                        alert("You are not authorized to be here!!!");
                        console.log(error);
                    });
            }
        }
    });

});
