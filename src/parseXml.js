function parseXml(xml) {
    var dom = null;
    if (window.DOMParser){
        try {
            dom = new DOMParser().parseFromString(xml,"text/xml");
        } catch (e) {
            dom = null;
        }
    }
    else alert("cannot parse xml string!");
    return dom;
}
export default parseXml;