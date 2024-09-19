// Asenkron bir fonksiyon oluşturuyoruz. Bu fonksiyon, API'den kullanıcının postlarını getirecek.
async function fetchUserPost() {
    // URL'deki query parametrelerini (userId gibi) almak için URLSearchParams kullanıyoruz.
    const urlParams = new URLSearchParams(window.location.search);
    
    // userId parametresini alıyoruz. Bu, URL'de 'userId=2' gibi bir değerden gelir.
    const userId = urlParams.get("userId");
    
    // userId'yi konsola yazdırıyoruz. Bu, tarayıcı geliştirici araçlarında kontrol amaçlı.
    console.log(userId);
  
    // JSONPlaceholder API'den belirli bir kullanıcıya ait postları almak için fetch kullanıyoruz.
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    
    // API'den gelen yanıtı JSON formatına dönüştürüyoruz.
    const userData = await response.json();
  
    // Hataları yakalamak için try-catch bloğu kullanıyoruz.
    try {
      // Gelen verileri forEach ile döngüye alıyoruz ve her bir post'u işliyoruz.
      userData.forEach((data) => {
        // Her bir post'u DOM'a eklemek için userDatatoCard fonksiyonunu çağırıyoruz.
        userDatatoCard(data);
      });
    } catch (error) {
      // Eğer bir hata oluşursa, kullanıcının karşısına bir uyarı çıkarıyoruz.
      alert("Bir Sorunla Karşılaşıldı:" + error);
    }
  }
  
  // Bu fonksiyon, alınan kullanıcı postlarını DOM'a (HTML yapısına) ekler.
  function userDatatoCard(userPost) {
    // 'postRow' adında bir div elementini seçiyoruz. Bu div'in içine postları ekleyeceğiz.
    const postRow = document.getElementById("postRow");
  
    // Yeni bir div elementi oluşturuyoruz. Bu, her bir post kartını içerecek.
    const div = document.createElement("div");
  
    // Oluşturduğumuz div'e 'col-lg-4' sınıfını ekliyoruz, böylece her bir kart 4 kolon genişliğinde olacak.
    div.classList.add("col-lg-4");
  
    // div'in içeriğini, bir Bootstrap kart yapısıyla dolduruyoruz. Post başlığı ve açıklaması burada gösteriliyor.
    div.innerHTML = `
          <div class="card">
        <div class="card-body bg-light">
          <div class="card-text">Post Title :<span class="text-success fw-bold">${userPost.title}</span></div>
          <div class="card-text fw-bold">Post Description : <span>${userPost.body}</span></div>
        </div>
      </div>
      `;
  
    // Yeni oluşturduğumuz div'i 'postRow' adındaki ana div'in içine ekliyoruz. Böylece her post ekranda görünür oluyor.
    postRow.appendChild(div);
  }
  
  // Bu fonksiyon, kullanıcıdan bir ID girmesini ister ve doğrulama yapar.
  function userIdInput() {
    // Kullanıcıdan bir ID girmesini isteyen bir prompt açıyoruz ve girilen değeri bir tamsayıya dönüştürüyoruz.
    const ınputUserId = parseInt(prompt("Enter user id"));
    
    // Eğer girilen ID 1 ile 10 arasında değilse, bir uyarı mesajı veriyoruz ve tekrar ID girmesini istiyoruz.
    if (ınputUserId < 1 || ınputUserId > 10) {
      alert("Lütfen 1 ila 10 arasında sayı giriniz!!!");
      // Kullanıcı doğru aralıkta bir değer girene kadar tekrar fonksiyonu çağırıyoruz.
      userIdInput();
    } else {
      // Kullanıcı doğru bir ID girerse, URL'yi güncelleyip 'posts.html?userId={inputUserId}' sayfasına yönlendiriyoruz.
      window.location.href = `posts.html?userId=${ınputUserId}`;
    }
  }
  
  // Sayfa yüklendiğinde fetchUserPost fonksiyonunu çağırarak API'den veri çekmeye başlıyoruz.
  fetchUserPost();
  