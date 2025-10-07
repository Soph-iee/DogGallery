"use strict";
const spinner = document.querySelector(".spinner");
const imgContainer = document.getElementById("image-container");
const errorMsg = document.getElementById("error");
async function fetchData() {
  try {
    spinner.style.display = "block";
    errorMsg.style.display = "none";
    imgContainer.innerHTML = "";
    const img = document.createElement("img");
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    if (!response.ok) {
      throw "resource not found at all";
    }
    const data = await response.json();
    img.src = data.message;
    img.alt = "random-dog-image";
    imgContainer.appendChild(img);
    spinner.style.display = "none";
  } catch (error) {
    errorMsg.style.display = "block";
    errorMsg.innerText = error;
  }
}
// SearchBreed

async function SearchBreed() {
  const Inputvalue = document.getElementById("inputField").value.toLowerCase();
  document.querySelector(".SearchResultContainer").innerHTML = "";
  try {
    const response = await fetch(
      `https://dog.ceo/api/breed/${Inputvalue}/images/random`
    );
    if (!response.ok) {
      throw `${Inputvalue} is not dog breed😢. Try again`;
    }
    const data = await response.json();
    document.getElementById("errorMsg").innerText = "";
    const img = document.createElement("img");
    img.src = data.message;
    img.alt = "random-dog-image";
    document.querySelector(".SearchResultContainer").appendChild(img);

    // document.getElementById("breedImage").src = data.message;
  } catch (error) {
    document.getElementById("errorMsg").innerText = error;
    document.querySelector(".SearchResultContainer").innerHTML = "";
  }
}

GetAllBreed();

async function GetAllBreed() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    if (!response.ok) {
      throw "resource noot found";
    }
    const data = await response.json();
    const allBreed = data.message;
    console.log(allBreed);
    AppendFilterOption(allBreed);
  } catch (error) {
    console.error(error);
  }
}

const select = document.getElementById("filter-container");
function AppendFilterOption(data) {
  for (const key in data) {
    const arr = data[key];

    // ✅ If array has content, make an optgroup
    if (Array.isArray(arr) && arr.length > 0) {
      const optGroup = document.createElement("optgroup");
      optGroup.label = key;

      arr.forEach((item) => {
        const option = document.createElement("option");
        option.value = `${item}-${key}`;
        option.textContent = `${item}-${key}`;
        optGroup.appendChild(option);
      });

      select.appendChild(optGroup);
    }
    // ✅ If array is empty, make a single option
    else {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = key;
      select.appendChild(option);
    }
  }
}

async function GetFilterBreed(data) {
  const value = data;
  try {
    const response = await fetch(`https://dog.ceo/api/breed/${value}/images`);
    if (!response.ok) {
      throw "resource not found";
    }
    const data = await response.json();
    const filterContainer = document.getElementById("filter-grid");
    console.log(filterContainer);
  } catch (error) {
    console.error(error);
  }
}

select.addEventListener("change", (e) => {
  const data = e.target.value;
  console.log(data);
  GetFilterBreed(data);
});
