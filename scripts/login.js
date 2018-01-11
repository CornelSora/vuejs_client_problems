$(document).ready(function() {
    var url = 'https://webtech-project-traininghelper-cornelsora.c9users.io';
    var myApp = new Vue({
        el: "#myApp",
        data: {
            username: "",
            password: "",
            errorLabel: "",

            usernameReg: "",
            email: "",
            password1: "",
            password2: "",
            tip: ""
        },
        methods: {
            submitLogin: function() {
                var user = {};
                user.username = this.username;
                user.password = this.password;
                this.errorLabel = "";
                this.$http.post(url + '/login', user)
                .then((response) => {
                    console.log(response.body);
                    Cookies.set('userid', response.body.id, 7);
                    console.log(Cookies.get('userid'));
                    alert("Auth with success");
                    window.location.href = "https://webtech-project-traininghelper-cornelsora.c9users.io/views/problems.html";
                }, (error) => {
                    this.errorLabel = "Account doesn't exist";
                })

                

                // if (this.username.length < 4) {
                //     this.errorLabel = "Username is too small";
                // } else {
                //     this.errorLabel = "";
                // }

            },
            registrationLogin: function() {
                var user = {};
                user.username = this.usernameReg;
                user.email = this.email;
                user.password = this.password1;
                user.password2 = this.password2;
                user.type = this.tip;
                if (user.username != "" && user.password != "") {
                    this.$http.post(url + '/register', user)
                    .then((response) => {
                        console.log(response);
                        alert("Registration with success! Now login!");
                        this.usernameReg = "";
                        this.email = "";
                        this.password1 = "";
                        this.password2 = "";
                        this.tip = "";
                    }, (error) => {
                        alert("sorry the server has an error");
                        console.log(error);
                    });    
                }
            }
        }
    });
});