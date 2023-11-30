const getVideoGames = async () => {
    try {
      return (await fetch("api/videoGames/")).json();
    } catch (error) {
      console.log(error);
    }
  };
  
  const showVideoGames = async () => {
    let videoGames = await getVideoGames();
    let videoGamesDiv = document.getElementById("videoGame-list");
    videoGamesDiv.innerHTML = "";
    videoGames.forEach((videoGame) => {
      const section = document.createElement("section");
      section.classList.add("videoGame");
      videoGamesDiv.append(section);
  
      const a = document.createElement("a");
      a.href = "#";
      section.append(a);
  
      const h3 = document.createElement("h3");
      h3.innerHTML = videoGame.name;
      a.append(h3);
  
      a.onclick = (e) => {
        e.preventDefault();
        displayDetails(videoGame);
      };
    });
  };
  
  const displayDetails = (videoGame) => {
    const videoGameDetails = document.getElementById("videoGame-details");
    videoGameDetails.innerHTML = "";
  
    const h3 = document.createElement("h3");
    h3.innerHTML = "Title: " + videoGame.name;
    videoGameDetails.append(h3);

    const pYear = document.createElement("p");
    pYear.innerHTML = "Year Released: " + videoGame.year;
    videoGameDetails.append(pYear);
  
    const dLink = document.createElement("a");
    dLink.innerHTML = "	&#x2715;";
    videoGameDetails.append(dLink);
    dLink.id = "delete-link";
  
    const eLink = document.createElement("a");
    eLink.innerHTML = "&#9998;";
    videoGameDetails.append(eLink);
    eLink.id = "edit-link";
  
    const pRating = document.createElement("p");
    pRating.innerHTML = "Rating(IGN): " + videoGame.rating;
    videoGameDetails.append(pRating);

    const pPrice = document.createElement("p");
    pPrice.innerHTML = "Price: " + videoGame.price;
    videoGameDetails.append(pPrice);

    const h4 = document.createElement("h4");
    h4.innerHTML = "Characters: ";
    videoGameDetails.append(h4);
    const ul = document.createElement("ul");
    videoGameDetails.append(ul);
    console.log(videoGame.characters);
    videoGame.characters.forEach((character) => {
      const li = document.createElement("li");
      ul.append(li);
      li.innerHTML = character;
    });
  
    eLink.onclick = (e) => {
      e.preventDefault();
      document.querySelector(".dialog").classList.remove("transparent");
      document.getElementById("add-edit-title").innerHTML = "Edit VideoGame";
    };
  
    dLink.onclick = (e) => {
      e.preventDefault();
      //delete videoGame
    };
  
    populateEditForm(videoGame);
  };
  
  const populateEditForm = (videoGame) => {};
  
  const addEditVideoGame = async (e) => {
    e.preventDefault();

    const form = document.getElementById("add-edit-videoGame-form");
    const formData = new FormData(form);
    formData.append("characters", getCharacters());

    let response;

    if(form._id.value == -1){
      formData.delete("_id");

      response = await fetch("/api/videoGames", {
        method: "POST",
        body: formData,
      })
    }

    if(response.status !=200){
      console.log("Error contacting server");
      return;
    }

    document.querySelector(".dialog").classList.add("transparent");
    resetForm();
    showVideoGames();
  };

  const getCharacters = () => {
    const inputs = document.querySelectorAll("#character-boxes input");
    const characters = [];

    inputs.forEach((input) => {
      characters.push(input.value);
    })

    return characters;
  }
  
  const resetForm = () => {
    const form = document.getElementById("add-edit-videoGame-form");
    form.reset();
    form._id = "-1";
    document.getElementById("character-boxes").innerHTML = "";
  };
  
  const showHideAdd = (e) => {
    e.preventDefault();
    document.querySelector(".dialog").classList.remove("transparent");
    document.getElementById("add-edit-title").innerHTML = "Add VideoGame";
    resetForm();
  };
  
const addCharacter = (e) => {
  e.preventDefault();
  const characterBoxes = document.getElementById("character-boxes");
  const input = document.createElement("input");
  input.type = "text";
  characterBoxes.append(input);
}

  window.onload = () => {
    showVideoGames();
    document.getElementById("add-edit-videoGame-form").onsubmit = addEditVideoGame;
    document.getElementById("add-link").onclick = showHideAdd;
  
    document.querySelector(".close").onclick = () => {
      document.querySelector(".dialog").classList.add("transparent");
    };

    document.getElementById("add-character").onclick = addCharacter;
  };