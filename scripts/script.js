$(document).ready(function() {

    var btnRegister = $("#btnRegister");
    var btnLogin = $("#btnLogin");
    var btnRegisterSubmit = $("#btnRegisterSubmit");

    btnRegister.click(function() {
        changeDisplayForm();
    });

    btnLogin.click(function() {
        changeDisplayForm();
    });

    var changeDisplayForm = function() {
        $("#loginFrm").animate({ height: "toggle", opacity: "toggle" });
        $("#registerFrm").animate({ height: "toggle", opacity: "toggle" });
    }

    var txtEmail = $("#txtEmail")[0];
    var txtUsername = $("#txtUsername")[0];
    var txtPassword = $("#txtPassword")[0];
    var txtPassword2 = $("#txtPassword2")[0];
    var txtTipCont = $("#txtTipCont")[0];
    var errorLabel = $("#errorLabel")[0];

    btnRegisterSubmit.click(function() {
        errorLabel.innerHTML = "";
        if (txtEmail.value != "" && txtEmail.value.indexOf("@") == -1) {
            txtEmail.style.borderColor = "red";
            errorLabel.innerHTML += "Email is not valid <br/>";
        }
        if (!txtUsername.value) {
            txtUsername.style.borderColor = "red";
            errorLabel.innerHTML += "Username is required <br/>";
        }
        if (!txtPassword.value) {
            txtPassword.style.borderColor = "red";
            errorLabel.innerHTML += "Password is required <br/>";
        }
        if (!txtPassword2.value) {
            txtPassword2.style.borderColor = "red";
            errorLabel.innerHTML += "Password repeat is required <br/>";
        }
        else if (txtPassword.value != txtPassword2.value) {
            txtPassword2.style.borderColor = "red";
            errorLabel.innerHTML += "Second password must be the same with the first password <br/>";
        }
    });

    $(".form-control input").each(function() {
        this.onchange = function() {
            if (this.value != "") {
                this.style.borderColor = "blue";
            }
        }
    });

    function ModalFunction() {
        var modal = $('#myModal');

        var btn = $("#myBtn");

        var span = $(".close");

        btn.click(function() {
            modal.fadeIn();
        });

        span.click(function() {
            modal.fadeOut();
        });

        $(window).click(function(event) {
            console.log(event.target);
            if (event.target == modal[0]) {
                modal.fadeOut();
            }
        });
    }

    ModalFunction();
});
