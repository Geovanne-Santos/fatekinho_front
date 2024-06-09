setTimeout(function(){
    var $PopUp = $(".popup .popuptext")
    var popup = $PopUp.css("visibility")

    do{
        popup = $PopUp.css("visibility");

        let timerInterval;
        Swal.fire({
        title: "Auto close alert!",
        html: "Popup: "+popup+" \n <b></b>",
        timer: 1500,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
        }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
        }
        });


        if(popup=="visible"){
            break
        }
        girarTodasAsColunas();
    }
    while(popup=="visible")
},8000)