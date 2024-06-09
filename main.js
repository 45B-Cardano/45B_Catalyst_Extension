let keyphrases = [
    "Name and surname",
    "Requested funds in ada",
    "how many months",
    "Summarize your solution",
    "describe your proposed solution",
    "define the positive impact",
    "your capability to deliver",
    "What are the key milestones",
    "Who is in the project team",
    "provide a cost breakdown",
    "cost of the project represent value for money"
]


let list = document.querySelector('#result-div');
for (const phrase of keyphrases) {
    const li = document.createElement("div");
    const textnode = document.createTextNode(phrase);
    li.appendChild(textnode);
    list.appendChild(li);
}

document.getElementById('read-content').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];

        
        function printTitle() {
            // TODO:  ver: porque por enquanto não consegui ter acesso à lista neste contexto?
            let keyphrases = [
                "Name and surname",
                "Requested funds in ada",
                "how many months",
                "Summarize your solution",
                "describe your proposed solution",
                "define the positive impact",
                "your capability to deliver",
                "What are the key milestones",
                "Who is in the project team",
                "provide a cost breakdown",
                "cost of the project represent value for money"
            ]
            // podia ser feito a partir de uma lista mais concisa 
            // (ex: apenas os que têm um mínimo de length, ou dentro de um elemento específico)

            //TODO: não verificar duas vezes, só dar uma volta com um if
            const elements_matched = Array.from(document.querySelectorAll('h2')).filter(el=> keyphrases.find(k => el.innerText.toLowerCase().includes(k.toLowerCase())));
            elements_matched.forEach(m=>{
                m.style="background-color:darkblue; color:white;";
                m.innerHTML = m.innerText; //reset
                let phrase = keyphrases.find(k => m.innerText.toLowerCase().includes(k.toLowerCase()));
                let index = m.innerText.indexOf(phrase);

                let oldInner = m.innerHTML.substring(index,phrase.length+index);
                let oldInnerSplit = m.innerHTML.split(oldInner);
                let newElement = "<span style='background-color:lightgreen;color:black;'>"+oldInner+"</span>";
                m.innerHTML = oldInnerSplit[0]+ newElement + oldInnerSplit[1];
            })
            var result = elements_matched.map(x=>x.innerText);
            // https://developer.chrome.com/docs/extensions/mv3/messaging/
            (async () => {
                const response = await chrome.runtime.sendMessage({info: result});
                // do something with response here, not outside the function
                console.log(response);
            })();
            
            //return resultStr;
        };

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: printTitle,
            //        files: ['contentScript.js'],  // To call external file instead
        }).then(() => console.log('Injected a function!'));
    });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script: " + sender.tab.url :
                "from the extension");
    var resp = request.info;
    if (resp) {
        var resultElement = document.getElementById("result-div");
        var listItems = Array.from(resultElement.children);
        
        // TODO: fazer mais elegante
        for (const item of listItems) {
            if(resp.find(r => r.toLowerCase().includes(item.innerText.toLowerCase()))){
                item.className="bg-lime-300 hover:bg-blue-200 pl-2 pr-1 hover:rounded hover:font-semibold cursor-pointer"
                // item.onclick=
            }else{
                item.style="";
            }
        }
        sendResponse({response: "resposta bem sucedida!"});
    }
  }
);