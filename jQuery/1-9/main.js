$(() => {
  tableRender();
});

function tableRender(sortKey = null) {
  let data = localStorageGet("userData", userData);
  $("thead , tbody").html("");

  if (data.length === 0) {
    alert("There is no data to show!");
    return;
  }

  if (!!sortKey) {
    sortFlag = !sortFlag;
    if (sortFlag) {
      data.sort((a, b) => {
        return b[sortKey]
          .toString()
          .localeCompare(a[sortKey].toString(), undefined, {
            numeric: true,
            sensivity: false,
          });
      });
    } else {
      data.sort((a, b) => {
        return a[sortKey]
          .toString()
          .localeCompare(b[sortKey].toString(), undefined, {
            numeric: true,
            sensivity: false,
          });
      });
    }
  }

  const headers = ["row", ...Object.keys(data[0])];

  $("thead").append(
    "<tr>" +
      headers
        .map((th) => {
          if (th === "row") {
            return `<th>${th}</th>`;
          } else {
            return `<th onclick = "tableRender('${th}')">${th}</th>`;
          }
        })
        .join("") +
      "</tr>"
  );

  for (const [index, user] of data.entries()) {
    $("tbody").append(
      `<tr ondblclick = "renderUserData(${user.uid})">` +
        `<td>${index + 1}</td>` +
        Object.values(user)
          .map((value) => {
            return `<td>${value}</td>`;
          })
          .join("") +
        "</tr>"
    );
  }
}

function localStorageSet(keyName, data) {
  localStorage.setItem(keyName, JSON.stringify(data));
}

function localStorageGet(keyName, alternative) {
  return JSON.parse(localStorage.getItem(keyName)) || alternative;
}

function openModal() {
  $(".mod").fadeIn(500);
}

function closeModal() {
  $(".mod").fadeOut(500);
  $(".mod-header").html("");
  $(".mod-body").html("");
  $(".mod-footer").html("");
}

function renderUserData(uid) {
  let data = localStorageGet("userData", userData);
  let user = data.find((user) => user.uid === uid);

  $(".mod-header , .mod-body, .mod-footer").html("");
  $(".mod-header").text(`${user.firstName}'s Information`);
  $(".mod-body").append(
    Object.entries(user)
      .map(([key, value]) => {
        return `
        <div class = 'row my-3'>
          <label class="col-3 text-warning" for="${key}"> ${key}:</label>
          <input
          id="${key}"
          type="text"
          placeholder="${key}"
          class="col-5 py-0 px-2 rounded-1"
          value="${value}"
          disabled
          />
        </div>
      `;
      })
      .join("")
  );
  $(".mod-footer").append(
    `
      <button onclick = 'renderUserUpdate(${user.uid})' class="btn btn-primary col-2 mx-5">Update</button>
      <button onclick = 'deleteUser(${user.uid})' class="btn btn-danger col-2 mx-5">Delete</button>
      <button
        class="btn btn-outline-warning col-2 mx-5"
        onclick="closeModal()"
      >
        close
      </button>
    `
  );
  openModal();
}

function deleteUser(uid) {
  let data = localStorageGet("userData", userData);

  data = data.filter((item) => item.uid !== uid);

  localStorageSet("userData", data);

  closeModal();
  tableRender();
}

function renderUserUpdate(uid) {
  let data = localStorageGet("userData", userData);
  let user = data.find((user) => user.uid === uid);

  $(".mod-header , .mod-body, .mod-footer").html("");
  $(".mod-header").text(`Update ${user.firstName}'s Information`);
  $(".mod-body").append(
    Object.entries(user)
      .map(([key, value]) => {
        if (key === "uid") {
          return `
          <div class = 'row my-3'>
            <label class="col-3 text-warning" for="${key}"> ${key}:</label>
            <input
            id="${key}"
            type="text"
            placeholder="${key}"
            class="col-5 py-0 px-2 rounded-1"
            value="${value}"
            disabled
            />
          </div>
        `;
        }

        return `
        <div class = 'row my-3'>
          <label class="col-3 text-warning" for="${key}"> ${key}:</label>
          <input
          id="${key}"
          type="text"
          placeholder="${key}"
          class="col-5 py-0 px-2 rounded-1"
          value="${value}"
          />
        </div>
      `;
      })
      .join("")
  );
  $(".mod-footer").append(
    `
      <button onclick = 'updateUser(${user.uid})' class="btn btn-outline-success col-2 mx-5">Save</button>
      <button onclick = 'renderUserData(${user.uid})' class="btn btn-secondary col-2 mx-5">Cancel</button>
    `
  );
}

function updateUser(uid) {
  const formData = $(".mod-body input");

  // Update Validation
  for (const input of formData) {
    if (input.value.trim() === "") {
      alert(`${input.id} input is empty`);
      return;
    }

    if (input.id === "personalCode") {
      if (input.value.trim().length < 10) {
        alert(`Minimum length for ${input.id} input is 10 digits.`);
        return;
      }
    }

    if (input.id === "phoneNumber") {
      if (input.value.trim().length < 11) {
        alert(`Minimum length for ${input.id} input is 11 digits.`);
        return;
      }
    }

    if (input.id === "phoneNumber" || input.id === "personalCode") {
      if (isNaN(Number(input.value.trim()))) {
        alert(`Invalid input for ${input.id}. ( You Must Enter Numbers )`);
        return;
      }
    }
  }

  let updatedUser = {};

  for (const input of formData) {
    if (input.id === "uid") {
      updatedUser[input.id] = Number(input.value);
      continue;
    }
    updatedUser[input.id] = input.value;
  }

  let data = localStorageGet("userData", userData);
  data = data.map((user) => {
    if (user.uid === uid) {
      return { ...user, ...updatedUser };
    } else {
      return user;
    }
  });
  localStorageSet("userData", data);
  tableRender();
  closeModal();
}

function renderCreateUser() {
  let data = localStorageGet("userData", userData);
  $(".mod-header , .mod-body, .mod-footer").html("");
  $(".mod-header").text(`Create New User`);
  $(".mod-body").append(
    Object.entries(data[0])
      .map(([key, value]) => {
        return `
        <div class = 'row my-3'>
          <label class="col-3 text-warning" for="${key}"> ${key}:</label>
          <input
          id="${key}"
          type="text"
          placeholder="${key}"
          class="col-5 py-0 px-2 rounded-1"
          value=""
          />
        </div>
      `;
      })
      .join("")
  );
  $(".mod-footer").append(
    `
      <button onclick = 'createUser()' class="btn btn-success col-2 mx-5">Create</button>
      <button onclick = 'closeModal()' class="btn btn-outline-warning col-2 mx-5">Close</button>
    `
  );
  openModal();
}

function createUser() {
  const formData = $(".mod-body input");
  let data = localStorageGet("userData", userData);

  // Create Validation
  for (const input of formData) {
    if (input.value.trim() === "") {
      alert(`${input.id} input is empty`);
      return;
    }

    if (input.id === "personalCode") {
      if (input.value.trim().length < 10) {
        alert(`Minimum length for ${input.id} input is 10 digits.`);
        return;
      }
    }

    if (input.id === "phoneNumber") {
      if (input.value.trim().length < 11) {
        alert(`Minimum length for ${input.id} input is 11 digits.`);
        return;
      }
    }

    if (
      input.id === "phoneNumber" ||
      input.id === "personalCode" ||
      input.id === "uid"
    ) {
      if (isNaN(Number(input.value.trim()))) {
        alert(`Invalid input for ${input.id}. ( You Must Enter Numbers )`);
        return;
      }
    }
    if (input.id === "uid") {
      let user = data.find((user) => user.uid === Number(input.value));
      if (!!user) {
        alert(`Duplicate UID Found. Please enter a unique UID!`);
        return;
      }
    }
  }

  let createdUser = {};

  for (const input of formData) {
    if (input.id === "uid") {
      createdUser[input.id] = Number(input.value);
      continue;
    }
    createdUser[input.id] = input.value;
  }
  data.push(createdUser);

  localStorageSet("userData", data);
  tableRender();
  closeModal();
}
