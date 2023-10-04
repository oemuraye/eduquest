// var paystack = require('paystack')('sk_test_71f3b9d8264d80b730cf960c3eff7d434fdb168e');
  const paystack = new PaystackPop();
function payWithPaystack(data) {
    paystack.newTransaction({
        key: 'pk_test_5c965cdcf6402965f3d962d93b1b8edd0fbdcdd1',
        email: 'example@email.com',
        amount: Number(data.amount.toString())*Number('100'),
        onSuccess: (transaction) => { 
            confirm(data.postid ,transaction.reference);
            // Payment complete! Reference: transaction.reference 
          },
          onCancel: () => {
            // user closed popup
          }
    });

}


function confirm(postid, tranid){
  console.log('ddddd')
  
  const proxyurl = `https://brykiva.herokuapp.com/api/confirm/${tranid}/${postid}`;
  console.log(proxyurl);

  var btn = document.getElementById("myBtn");
  // Get the modal
  var modal = document.getElementById("myModal");
    // When the user clicks the button, open the modal 
    modal.style.display = "block";

  fetch(proxyurl)
    .then(response => response)
    .then(data => {
      const resData = data.json().then(value =>{
          // let objTo = document.getElementById('grid');
      let loader =  document.getElementById("loading_show")
    
      // let success =  document.getElementById("loading_show")
      loader.style.display = "none";
      var video = document.getElementById('video')
      video.style.display = "block";
      video.innerText = `N${value.price}`;
      var video2 = document.getElementById('video2')
      video2.style.display = "block";
      video2.innerText = value.url;
      video2.href =  value.url;
      video2.target= "_blank"
      console.log(value);
      });
    })
    .catch((err) => console.log("Can’t access " + url + " response. Blocked by browser?" + err));
}