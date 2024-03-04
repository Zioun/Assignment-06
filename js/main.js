const postArea = document.getElementById("post-area");
const latestPostArea = document.getElementById("latest-post-area")

const fecthPost = async (search) =>{
    if(search){
        const url = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${search}`;
        const response = await fetch(url)
        const responseData = await response.json();
        postArea.textContent = "";
        responseData.posts.forEach((postArray)=>{
        const badgeArea = document.createElement("div");
        if (postArray.isActive === true) {
            badgeArea.innerHTML = `
                <span id="badge" class="indicator-item badge badge-success border-[3px] border-[#FFFFFF] h-[23px]"></span>
            `;
        } else {
            badgeArea.innerHTML = `
                <span id="badge" class="indicator-item badge badge-error border-[3px] border-[#FFFFFF] h-[23px]"></span>
            `;
        }
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="bg-[#F3F3F5] p-[30px] md:p-[40px] rounded-[24px] flex flex-col md:flex-row gap-[24px] justify-center hover:bg-[#F2F2FF]">
            <div>
                <div id="badge-area" class="indicator">
                    ${badgeArea.innerHTML}
                    <div class="grid h-[72px] max-w-[72px] bg-base-300 place-items-center rounded-2xl"><img class="rounded-2xl" src="${postArray.image}" /></div>
                </div>
            </div>
            <div>
                <div class="flex gap-[20px]">
                    <h1 class="text-[14px] font-medium inter"># <span>${postArray.category}</span></h1>
                    <h2 class="text-[14px] font-medium inter">Author : <span>${postArray.author.name}</span></h2>
                </div>
                <div class="border-dashed border-b-[2px] border-[#BABACA]">
                    <h1 class="mulish font-bold text-[20px] mt-[12px] mb-[16px]">${postArray.title}</h1>
                    <p class="max-w-[569px] md:w-[569px] mb-[20px] inter text-[16px] font-normal text-[#6C6D7D]">${postArray.description}</p>
                </div>
                <div class="flex flex-col md:flex-row  justify-between mt-[20px]">
                    <div class="flex max-w-[283px] gap-[20px] md:gap-[25px]">
                        <div class="flex gap-[12px]">
                            <span class="inter text-[16px] font-normal text-[#6C6D7D]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                </svg>
                            </span>
                            <span class="inter text-[16px] font-normal text-[#6C6D7D]">${postArray.comment_count}</span>
                        </div>
                        <div class="flex gap-[12px]">
                            <span class="inter text-[16px] font-normal text-[#6C6D7D]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg> 
                            </span>
                            <span class="inter text-[16px] font-normal text-[#6C6D7D]">${postArray.view_count}</span>
                        </div>
                        <div class="flex gap-[12px]">
                            <span class="inter text-[16px] font-normal text-[#6C6D7D]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </span>
                            <span class="inter text-[16px] font-normal text-[#6C6D7D]">${postArray.posted_time} <span>m</span></span>
                        </div>
                    </div>
                    <div class="mt-5 md:mt-0 flex justify-center">
                        <button class="bg-[#10B981] p-2 rounded-full text-white" onclick="markItem('${postArray.title.replace("'", "")}','${postArray.view_count}')"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" /></svg>
                    </button>
                    </div>
                </div>
            </div>
        </div>
        `;
        setTimeout(()=>{
            postArea.appendChild(div);
        },2000)
    });
    preLoader(false);
    }else{
        const url = `https://openapi.programming-hero.com/api/retro-forum/posts`;
        const response = await fetch(url)
        const responseData = await response.json()
        postArea.textContent = "";
        responseData.posts.forEach((postArray)=>{
        const badgeArea = document.createElement("div");
        if (postArray.isActive === true) {
            badgeArea.innerHTML = `
                <span id="badge" class="indicator-item badge badge-success border-[3px] border-[#FFFFFF] h-[23px]"></span>
            `;
        } else {
            badgeArea.innerHTML = `
                <span id="badge" class="indicator-item badge badge-error border-[3px] border-[#FFFFFF] h-[23px]"></span>
            `;
        }
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="bg-[#F3F3F5] p-[30px] md:p-[40px] rounded-[24px] flex flex-col md:flex-row gap-[24px] justify-center hover:bg-[#F2F2FF]">
            <div>
                <div id="badge-area" class="indicator">
                    ${badgeArea.innerHTML}
                    <div class="grid h-[72px] max-w-[72px] bg-base-300 place-items-center rounded-2xl"><img class="rounded-2xl" src="${postArray.image}" /></div>
                </div>
            </div>
            <div>
                <div class="flex gap-[20px]">
                    <h1 class="text-[14px] font-medium inter"># <span>${postArray.category}</span></h1>
                    <h2 class="text-[14px] font-medium inter">Author : <span>${postArray.author.name}</span></h2>
                </div>
                <div class="border-dashed border-b-[2px] border-[#BABACA]">
                    <h1 class="mulish font-bold text-[20px] mt-[12px] mb-[16px]">${postArray.title}</h1>
                    <p class="max-w-[569px] md:w-[569px] mb-[20px] inter text-[16px] font-normal text-[#6C6D7D]">${postArray.description}</p>
                </div>
                <div class="flex flex-col md:flex-row  justify-between mt-[20px]">
                    <div class="flex max-w-[283px] gap-[20px] md:gap-[25px]">
                        <div class="flex gap-[12px]">
                            <span class="inter text-[16px] font-normal text-[#6C6D7D]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                </svg>
                            </span>
                            <span class="inter text-[16px] font-normal text-[#6C6D7D]">${postArray.comment_count}</span>
                        </div>
                        <div class="flex gap-[12px]">
                            <span class="inter text-[16px] font-normal text-[#6C6D7D]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg> 
                            </span>
                            <span class="inter text-[16px] font-normal text-[#6C6D7D]">${postArray.view_count}</span>
                        </div>
                        <div class="flex gap-[12px]">
                            <span class="inter text-[16px] font-normal text-[#6C6D7D]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </span>
                            <span class="inter text-[16px] font-normal text-[#6C6D7D]">${postArray.posted_time} <span>m</span></span>
                        </div>
                    </div>
                    <div class="mt-5 md:mt-0 flex justify-center">
                    <button class="bg-[#10B981] p-2 rounded-full text-white" onclick="markItem('${postArray.title.replace("'", "")}','${postArray.view_count}')"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
                  </svg>
                  </button>
                    </div>
                </div>
            </div>
        </div>
        `;
        setTimeout(()=>{
            postArea.appendChild(div);
        },2000)
    });
    preLoader(false);
    }
    
}

const getSearchValue = () =>{
    const searchInput = document.getElementById("search-input");
    document.getElementById("search-btn").addEventListener("click",() =>{
        search = searchInput.value
        fecthPost(search);
        preLoader(true);
    })
}
getSearchValue();

const preLoader = (loader) => {
    const preLoaderIcon = document.getElementById("pre-loader");
    if (loader) {
        preLoaderIcon.classList.remove("hidden");
    }else{
        setTimeout(()=>{
            preLoaderIcon.classList.add("hidden");
        },2000)
    }
}

const markItem = (title,view)=>{
    const markCount = document.getElementById("mark-count");
    let count = parseInt(markCount.innerText);
    markCount.innerText = ++count;
    const markArea = document.getElementById("mark-area");
    const div = document.createElement("div");
    div.className = "flex items-center justify-between bg-[#FFFFFF] px-[16px] py-[15px] rounded-[16px]";
    div.innerHTML = `
    <div class="w-[212px]">
        <h1 class="mulish font-semibold text-[16px]">${title}</h1>
    </div>
    <div class="flex gap-2">
        <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
        </span>
        <span>${view}</span>
    </div>
    `;
    markArea.appendChild(div);
    
}

fecthPost();
const fatchLatestPost = async () =>{
    const url = "https://openapi.programming-hero.com/api/retro-forum/latest-posts";
    const response = await fetch(url)
    const data = await response.json()
    const slicedData  = data.slice(0, 3);
    slicedData .forEach((post)=>{
        const div = document.createElement("div");
        div.className ="card card-compact bg-base-100 border p-[24px] col-span-12 md:col-span-6 lg:col-span-4";
        div.innerHTML = `
        <div class="">
            <img class="rounded-xl" src="${post.cover_image}" alt="Card"/>
        </div>
        <div class="">
            <div class="flex mt-[24px] mb-[12px] gap-[8px]">
                <span class="text-[16px] mulish font-normal text-[#717181]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                    </svg>
                </span>
                <span class="text-[16px] mulish font-normal text-[#717181]">${post.author?.posted_date || "No publish date"}</span>
            </div>
            <div>
                <h1 class="mulish font-extrabold text-[18px] text-[#12132D]">${post.title}</h1>
                <p class="text-[16px] mt-[12px] mb-[16px] mulish font-normal text-[#717181]">${post.description}</p>
            </div>
            <div class="flex gap-[16px]">
                <div>
                    <img class="w-[44px] rounded-full" src="${post.profile_image}" alt="profile">
                </div>
                <div>
                    <h2 class="mulish font-bold text-[16px] text-[#12132D]">${post.author.name}</h2>
                    <h3 class="text-[14px] mulish font-normal text-[#717181]">${post.author?.designation || "Unknown"}</h3>
                </div>
            </div>
        </div>
        `
        latestPostArea.appendChild(div);
    });
}
fatchLatestPost()
