const passField = document.querySelector(`#inp_pass`);
      const showBtn = document.querySelector(`.fa-eye`);
      showBtn.onclick = (()=>{
        if(passField.type === "password"){
          passField.type = "text";
          showBtn.classList.add("show-hide");
        }else{
          passField.type = "password";
          showBtn.classList.remove("show-hide");
        }
      });