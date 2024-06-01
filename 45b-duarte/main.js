let keyphrases = [
    "What is the problem",
    "Summarize your solution",
    "Describe your proposed solution",
    "Measure the success",
    "Your capability to deliever",
    "Your main goals",
    "Detailed breakdown",
    "Project's milestones",
    "Main tasks or activities",
    "Outputs and intended outcomes",
    "Detailed budget breakdown",
    "In the project team",
    "Represent value for money",
    "Requested funds in ADA"
]


let list = document.querySelector('#list');
for (const phrase of keyphrases) {
    const li = document.createElement("li");
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
                "What is the problem",
                "Summarize your solution",
                "Describe your proposed solution",
                "Measure the success",
                "Your capability to deliever",
                "Your main goals",
                "Detailed breakdown",
                "Project's milestones",
                "Main tasks or activities",
                "Outputs and intended outcomes",
                "Detailed budget breakdown",
                "In the project team",
                "Represent value for money",
                "Requested funds in ADA"
            ]
            // podia ser feito a partir de uma lista mais concisa 
            // (ex: apenas os que têm um mínimo de length, ou dentro de um elemento específico)
            const elements_matched = Array.from(document.querySelectorAll('h2')).filter(el=> keyphrases.find(k => el.innerText.toLowerCase().includes(k.toLowerCase())));
            elements_matched.forEach(m=>{m.style="background-color:lightblue;";})
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
        var resultElement = document.getElementById("list");
        var listItems = Array.from(resultElement.children);
        
        // TODO: fazer mais elegante
        for (const item of listItems) {
            if(resp.find(r => r.toLowerCase().includes(item.innerText.toLowerCase()))){
                item.style="background-color:lightblue;"
                // item.onclick=
            }else{
                item.style="";
            }
        }
        sendResponse({response: "resposta bem sucedida!"});
    }
  }
);