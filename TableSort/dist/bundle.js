(()=>{"use strict";class t{constructor(){this.events={}}on(t,e){this.events[t]||(this.events[t]=[]),this.events[t].push(e)}emit(t,e){const s=this.events[t];s&&s.slice().forEach((t=>t.call(null,e)))}}function e(t){return t===Object(t)}function s(t,e){return Math.floor(Math.random()*(e-t)+t)}function n(t){return t.split(" ").slice(0,2).map((t=>t.charAt(0).toUpperCase())).join("")}class o extends t{constructor(t){super(),this.type=t,this.modal=null,this.backdropTemplate=document.getElementById("backdrop").content.cloneNode(!0),this.backdrop=this.backdropTemplate.querySelector(".backdrop"),this.boundClose=this.close.bind(this)}show(t){const e=this.toHtml(t);document.body.insertAdjacentHTML("beforeend",e),document.body.append(this.backdrop),this.modal=document.getElementById(this.type),setTimeout((()=>{document.body.addEventListener("click",this.boundClose)}),0),this.setEventListeners()}close(t){(t.target.classList.contains("backdrop")||"close-btn"===t.target.id)&&(this.modal.remove(),this.modal=null,this.backdrop.remove(),document.body.removeEventListener("click",this.boundClose))}}const i=new class extends t{constructor(){super(),this.state=[],this.colors=["#e4e7eb","#fae2e2","#fae3cd","#fbe6a2","#d2eef3","#d4eee2","#eae7f8"]}get modelState(){return this.state}set modelState(t){Array.isArray(t)&&(this.state=t)}get filteredData(){return this.filteredState}set filteredData(t){Array.isArray(t)&&(this.filteredState=t)}fixCompanyName(t){t.forEach((t=>{t.company=t.company.name,t.color=this.colors[s(0,this.colors.length)]}))}async getUsers(){try{const t=await async function(){try{const t=await fetch("https://jsonplaceholder.typicode.com/users");if(!t.ok)throw new Error("Ошибка сети");return await t.json()}catch{throw new Error("Не удалось получить данные от сервера")}}();return this.fixCompanyName(t),this.modelState=t,this.modelState}catch(t){throw new Error(t)}}setNodes(t){this.modelState.forEach(((e,s)=>{e.node=t[s]}))}filtering(t){return this.filteredData=this.modelState.filter((e=>e.name.toLowerCase().includes(t))),this.filteredData}sorting(t){const s=this.filteredData?this.filteredData:this.modelState;return s.sort(((s,n)=>(s=e(s[t])?s[t].city.trim().toLowerCase():s[t].trim().toLowerCase())>(n=e(n[t])?n[t].city.trim().toLowerCase():n[t].trim().toLowerCase())?1:s<n?-1:0)),s}getContacts(t){return(this.filteredData?this.filteredData:this.modelState).map((e=>e[t]))}getUserById(t){return this.modelState.find((e=>e.id===Number(t)))}getIndexById(t){return this.modelState.findIndex((e=>e.id===Number(t)))}sleep(t){return new Promise((e=>setTimeout(e,t)))}async updateState(t){await this.sleep(500);const e=this.getUserById(t.id);return delete t.id,Object.keys(e).map((s=>{void 0!==t[s]&&(e[s]=t[s])})),e}delete(t){const e=this.getIndexById(t);if(-1!=e){const t=this.modelState[e].node;return this.modelState.splice(e,1),t}throw new Error("Sorry... User not found")}},r=new class extends t{constructor(){super(),this.usersWrap=document.querySelector(".users"),this.loadButton=document.querySelector("#load-button"),this.preloader=document.querySelector("#fake-user-row"),this.userRow=document.querySelector("#user-row"),this.sortUserBtn=document.getElementById("username"),this.sortEmailBtn=document.getElementById("email-btn"),this.sortCompanyBtn=document.getElementById("company"),this.filterInput=document.querySelector(".search-input"),this.boundGetUsers=this.getUsers.bind(this),this.loadButton.addEventListener("click",this.boundGetUsers),this.setDisabledButtons(!0)}setDisabledButtons(t){this.filterInput.disabled=t,this.sortUserBtn.disabled=t,this.sortEmailBtn.disabled=t,this.sortCompanyBtn.disabled=t}setEventListeners(){this.filterInput.addEventListener("input",this.handlerFilter.bind(this)),this.sortUserBtn.addEventListener("click",this.handlerSort.bind(this)),this.sortCompanyBtn.addEventListener("click",this.handlerSort.bind(this)),this.moreInfoBtn=document.querySelectorAll(".more-info-btn"),this.moreInfoBtn.forEach((t=>t.addEventListener("click",(e=>this.emit("showPopup",{event:e,id:t.id})))))}getUsers(t){t.preventDefault(),t.target.disabled=!0,this.loadButton.removeEventListener("click",this.boundGetUsers),this.usersWrap.textContent="",this.emit("loadUsers")}setPreloader(){const t=document.createElement("div");return t.classList.add("rows-fake"),Array.from(this.preloader.content.querySelectorAll(".td-fake")).map((t=>t.style.width=s(20,100)+"%")),Array.from(this.preloader.content.querySelectorAll(".name-icon-fake")).map((t=>t.style.background="#e4e7eb")),t.append(this.preloader.content.cloneNode(!0)),this.usersWrap.append(t),t}removePreloader(t){this.setDisabledButtons(!1),t.remove()}showError(t){this.usersWrap.textContent=t}renderUsers(t){if(!t.length)return this.usersWrap.textContent="No users",void this.setDisabledButtons(!0);t.map((t=>{const e=this.userRow.content.querySelector(".name-icon");e.textContent=n(t.name),e.style.background=t.color,this.userRow.content.querySelector(".js-user").textContent=t.name,this.userRow.content.querySelector(".js-username").textContent=t.username,this.userRow.content.querySelector(".js-contact").textContent=t.email,this.userRow.content.querySelector(".js-company").textContent=t.company,this.userRow.content.querySelector(".more-info-btn").id=t.id;const s=this.userRow.content.cloneNode(!0);this.usersWrap.append(s)})),this.setNodesToModelState(),this.setEventListeners()}setNodesToModelState(){const t=this.usersWrap.querySelectorAll(".tr");this.emit("setNodes",t)}handlerFilter(t){const e=t.target.value.toLowerCase();this.emit("filter",{filter:e,inputType:t.inputType})}filterRow(t,e){const s=this.usersWrap.querySelectorAll(".js-user");if("deleteContentBackward"===e)t.forEach((t=>{this.usersWrap.appendChild(t.node)}));else{const e=t.map((t=>t.name));s.forEach((t=>{const s=t.textContent;e.includes(s)||t.parentNode.parentNode.remove()}))}}handlerSort({target:t}){const e=t.classList.contains("ascend")?"ascend":"descend";"ascend"===e?t.classList.remove("ascend"):t.classList.add("ascend"),this.emit("sort",{target:t.id,order:e})}sortRow(t){t.forEach((t=>{this.usersWrap.appendChild(t.node)}))}changeContactList(t,s){this.sortEmailBtn.textContent=s,this.usersWrap.querySelectorAll(".js-contact").forEach(((s,n)=>{s.textContent=e(t[n])?t[n].city+", "+t[n].street:t[n]}))}updateUserRow(t){t.node.querySelector(".js-user").textContent=t.name,t.node.querySelector(".js-username").textContent=t.username,t.node.querySelector(".js-contact").textContent=t.email,t.node.querySelector(".js-company").textContent=t.company}deleteUserRow(t){this.activateLoadButton(),t.classList.add("deleting"),t.addEventListener("animationend",(()=>{t.remove()}))}activateLoadButton(){this.loadButton.disabled=!1,this.loadButton.textContent="Обновить список",this.loadButton.addEventListener("click",this.boundGetUsers)}},d=new class extends t{constructor(){super(),this.sortEmailBtn=document.getElementById("email-btn"),this.popupTemplateContacts=document.querySelector("#popupContacts").content.cloneNode(!0),this.popupTemplateInfo=document.querySelector("#popupInfo").content.cloneNode(!0),this.popupContacts=this.popupTemplateContacts.querySelector(".tip-menu"),this.popupInfo=this.popupTemplateInfo.querySelector(".tip-menu"),this.targetId=null,this.isOpen=!1,this.selectedContact="email",this.userId=null,this.boundClose=this.close.bind(this),this.popupContacts.querySelector("#order").addEventListener("click",this.sortContacts.bind(this)),this.popupContacts.querySelector("#menu").addEventListener("click",this.changeContacts.bind(this)),this.popupInfo.querySelector("#edit").addEventListener("click",this.editUser.bind(this)),this.popupInfo.querySelector("#more-info").addEventListener("click",this.showUserInfo.bind(this)),this.popupInfo.querySelector("#delete").addEventListener("click",this.deleteUser.bind(this)),this.sortEmailBtn.addEventListener("click",(t=>this.show(t,this.popupContacts))),document.body.addEventListener("closeOpenedPopup",this.boundClose)}show(t,e,s){t.stopPropagation(),this.targetId===t.target.id&&this.isOpen?this.close(t):this.open(t,e,s),this.targetId=t.target.id}open(t,e,s){const n=new CustomEvent("closeOpenedPopup");document.body.dispatchEvent(n),this.getCoordinate(t,e),document.body.append(e),this.isOpen=!0,e.classList.contains("popup-info")&&(this.userId=s),document.body.addEventListener("click",this.boundClose)}close(t){const e=document.querySelector(".tip-menu")||void 0;e&&!t.target.closest(".title")&&(e.remove(),this.isOpen=!1,document.body.removeEventListener("click",this.boundClose))}getCoordinate(t,e){const s=t.target.getBoundingClientRect();s.y+=26,e.classList.contains("popup-info")?(e.style.left=s.x-170+"px",e.style.top=s.y+"px"):(e.style.left=s.x+"px",e.style.top=s.y+"px")}setMarker(t){t.target.parentNode.querySelectorAll("a").forEach((t=>{t.classList.contains("selected")&&t.classList.remove("selected")})),t.target.classList.add("selected")}sortContacts(t){t.preventDefault(),this.setMarker(t);const e=t.target.id;"ascend"===e?this.sortEmailBtn.classList.add("ascend"):this.sortEmailBtn.classList.remove("ascend"),this.emit("sort",{target:this.selectedContact,order:e})}changeContacts(t){t.preventDefault(),this.setMarker(t),this.selectedContact=t.target.id,this.emit("changeContactInfo",t.target.id)}editUser(t){t.preventDefault(),this.emit("showEditModal",this.userId)}showUserInfo(t){t.preventDefault(),this.emit("showAboutModal",this.userId)}deleteUser(t){t.preventDefault(),confirm("Вы уверены, что хотите удалить пользователя?")&&this.emit("deleteUser",this.userId)}},a=new class extends o{constructor(){super("about-modal")}toHtml(t){return`\n            <div class="modal-wrap" id="about-modal">\n                <div class="modal">\n                    <div class="modal_title">\n                        <span class="modal_title-logo" style="background: ${t.color}">${n(t.name)}</span>\n                        <h2 class="modal_title-fullname">${t.name}</h2>\n                    </div>\n                    <div class="modal_content">\n                        <div class="modal_content-table">\n                            <div class="modal_content-row">\n                                <div class="modal_content-cel">id</div>\n                                <div class="modal_content-cel">${t.id}</div>\n                            </div>\n                            <div class="modal_content-row">\n                                <div class="modal_content-cel">Nickname</div>\n                                <div class="modal_content-cel">${t.username}</div>\n                            </div>\n                            <div class="modal_content-row">\n                                <div class="modal_content-cel">Email</div>\n                                <div class="modal_content-cel">${t.email}</div>\n                            </div>\n                            <div class="modal_content-row">\n                                <div class="modal_content-cel">Phone</div>\n                                <div class="modal_content-cel">${t.phone}</div>\n                            </div>\n                            <div class="modal_content-row">\n                                <div class="modal_content-cel">Address</div>\n                                <div class="modal_content-cel">${t.address.zipcode}, ${t.address.city}, ${t.address.street}</div>\n                            </div>\n                            <div class="modal_content-row">\n                                <div class="modal_content-cel">Website</div>\n                                <div class="modal_content-cel">${t.website}</div>\n                            </div>\n                            <div class="modal_content-row">\n                                <div class="modal_content-cel">Company</div>\n                                <div class="modal_content-cel">${t.company}</div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="model_footer">\n                        <button class="btn" id="close-btn">Close</button>\n                    </div>\n                </div>\n            </div>\n        `}setEventListeners(){}},l=new class extends o{constructor(){super("edit-modal"),this.saveBtn=null}toHtml(t){const e=t.node.getBoundingClientRect();return`\n        <div class="tr-editing-wrap" style="top: ${e.y}px; left: ${e.x-20}px;" id="edit-modal">\n            <div class="tr-editing" style="width: ${e.width}px">\n                <div class="td-editing">\n                    <span class="name-icon" style="background: ${t.color};">${n(t.name)}</span>\n                    <span class="js-user"><input type="text" placeholder="Name..." class="edit-input" id="name" value="${t.name}" autofocus="autofocus"></span>\n                </div>\n                <div class="td-editing"><input type="text" placeholder="Username..." class="edit-input" id="username" value="${t.username}"></div>\n                <div class="td-editing"><input type="text" placeholder="Email..." class="edit-input" id="email" value="${t.email}"></div>\n                <div class="td-editing"><input type="text" placeholder="Company..." class="edit-input" id="company" value="${t.company}"></div>\n            </div>\n            <div class="td-btns">\n                <button class="btn btn-save" id="${t.id}">Сохранить</button>\n                <button class="btn btn-cancel" id="close-btn">Отменить</button>\n            </div>\n        </div>\n        `}setEventListeners(){this.saveBtn=this.modal.querySelector(".btn-save"),this.saveBtn.addEventListener("click",this.saveEdit.bind(this))}normalize(t){return t.trim()}saveEdit({target:t}){const e={};e.id=Number(t.id),this.modal.querySelectorAll('input[type="text"]').forEach((t=>{e[t.id]=this.normalize(t.value)})),this.emit("saveEdit",e)}forceClose(){this.modal.remove(),this.modal=null,this.backdrop.remove(),document.body.removeEventListener("click",this.boundClose)}setPreloaderBtn(){this.saveBtn.innerHTML=this.saveBtn.textContent+'<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-notch" class="load-svg" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z"></path></svg>'}};new class{constructor(t,e,s,n,o){this.model=t,this.view=e,this.popup=s,this.about=n,this.edit=o,e.on("loadUsers",this.loadUsers.bind(this)),e.on("setNodes",this.setNodesToModelState.bind(this)),e.on("filter",this.filtering.bind(this)),e.on("sort",this.sorting.bind(this)),e.on("showPopup",this.showPopup.bind(this)),s.on("changeContactInfo",this.changeContacts.bind(this)),s.on("sort",this.sorting.bind(this)),s.on("showAboutModal",this.showAboutModal.bind(this)),s.on("deleteUser",this.deleteUser.bind(this)),s.on("showEditModal",this.showEditModal.bind(this)),o.on("saveEdit",this.editUser.bind(this))}loadUsers(){const t=this.view.setPreloader();this.model.getUsers().then((e=>{this.view.removePreloader(t),this.view.renderUsers(e)})).catch((t=>{this.view.showError(t)}))}setNodesToModelState(t){this.model.setNodes(t)}filtering({filter:t,inputType:e}){if(!this.model.modelState.length)return;const s=this.model.filtering(t);this.view.filterRow(s,e)}sorting({target:t,order:e}){const s=this.model.sorting(t);"ascend"===e&&s.reverse(),this.view.sortRow(s)}showPopup({event:t,id:e}){this.popup.show(t,this.popup.popupInfo,e)}changeContacts(t){const e=this.model.getContacts(t);this.view.changeContactList(e,t)}showEditModal(t){const e=this.model.getUserById(t);this.edit.show(e)}editUser(t){this.edit.setPreloaderBtn(),this.model.updateState(t).then((t=>{this.view.updateUserRow(t),this.edit.forceClose()}))}showAboutModal(t){this.model.getUserById=function(t){const e=new Map;return function(s){if(e.has(s))return e.get(s);const n=t.call(this,s);return e.set(s,n),n}}(this.model.getUserById);const e=this.model.getUserById(t);this.about.show(e)}deleteUser(t){try{const e=this.model.delete(t);this.view.deleteUserRow(e),0===this.model.modelState.length&&this.view.renderUsers(this.model.modelState)}catch(t){alert(t)}}}(i,r,d,a,l)})();