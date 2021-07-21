const selectName = document.querySelector("#userOptions")
const buttonSearch = document.querySelector("button");
const cardUser = document.querySelector(".card-user");
const userName = document.querySelector(".user-name span");
const userAddress = document.querySelector(".user-address span");
const userCompany = document.querySelector(".user-company span");
const userEmail = document.querySelector(".user-email span");

const saveInLocalStorage = (user) => {
  localStorage.setItem("user",JSON.stringify(user))
};

const loadUserFromLocalStorage = () => {
  const userFromLocalStorage = localStorage.getItem("user");
  const parsedUser = JSON.parse(userFromLocalStorage)
  return parsedUser
};

const showOnScreen = (user) => {
  userName.textContent = user.name
  userAddress.textContent = ` Rua ${user.address.street}, ${user.address.city}`
  userCompany.textContent = user.company.name
  userEmail.textContent = user.email
};

async function getDataUser() {
  const dataUserResponse = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );
  const dataUserJson = await dataUserResponse.json();
  const userExist = dataUserJson.find(
    (user) => user.name.toLowerCase() === selectName.value.toLowerCase()
  );
  console.log(userExist);
  return userExist;
}

buttonSearch.addEventListener("click", async (event) => {
  event.preventDefault();
  const user = await getDataUser();
  if (user) {
    cardUser.style.display = "block"
    saveInLocalStorage(user);
    showOnScreen(user);
  } else {
    cardUser.style.display = "none"
    }
});

const user = loadUserFromLocalStorage();

if (user) {
  showOnScreen(user);
}

async function fillOptions() {
  const dataUserResponse = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );
  const dataUserJson = await dataUserResponse.json();
  dataUserJson.forEach((user) => {
    const option = document.createElement("option")
    option.textContent = user.name
    selectName.appendChild(option)
  })
}
 fillOptions()