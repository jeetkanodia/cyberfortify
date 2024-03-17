mock removed 

for now give only this url : 
    "url": "https://dogether-project.vercel.app/" ( will tell in morning why ) 

/api/scan : the only route , user is giving web link 

first get will give target then scann happens and vulnerabilites are displayed name and desc 

format postman :
{
    "findings": [
        {
            "name": "Referrer policy not defined",
            "description": "The application does not prevent browsers from sending sensitive information to third party sites in the **referer** header.\r"
        },
        {
            "name": "Missing Content Security Policy header",
            "description": "The Content Security Policy (CSP) is an HTTP header through which site owners define a set of security rules that the browser must follow when rendering their site. \r"
        },
        {
            "name": "Missing clickjacking protection",
            "description": "A **frameable response** occurs when one or multiple pages can be used on an iframe on any website. This allows the **clickjacking** attack to be used. \r"
        },
        {
            "name": "Browser content sniffing allowed",
            "description": "The application allows browsers to try to mime-sniff the content-type of the responses. This means the browser may try to guess the content-type by looking at the response content, and render it in way it was not intended to. This behavior may lead to the execution of malicious code, for instance, to explore an XSS vulnerability.\r"
        }
    ]
}
