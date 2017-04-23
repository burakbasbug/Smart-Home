/*
  TODO
 Implementieren Sie die folgenden Funktionen um die SVG-Grafiken der Geräte anzuzeigen und verändern.

 Hinweise zur Implementierung:
 - Verwenden Sie das SVG-Plugin für jQuery, welches bereits für Sie eingebunden ist (Referenz: http://keith-wood.name/svg.html)
 - Sie dürfen das Bild bei jedem Funktionenaufruf neu laden und Ihre Veränderungen vornehmen;
 Tipp: Durch Überschreiben der OnLoad Funktion von svg.load() können Sie die Grafik noch bevor diese zum ersten Mal angezeigt wird verändern
 - In allen bereit gestellten SVG-Grafiken sind alle für Sie relevanten Stellen mit Labels markiert.
 - Da Ihre Grafiken nur beim Laden der Übersichtsseite neu gezeichnet werden müssen, bietet es ich an die draw_image Funktionen nach dem vollständigen Laden dieser Seite auszuführen.
 Rufen Sie dazu mit draw_image(id, src, min, max, current, values) die zugrunde liegende und hier definierte Funktione auf.
 */


//function drawThermometer(id, src, min, max, current, values) {
function drawThermometer(id, src, controlUnits) {
    /*
   Passen Sie die Höhe des Temperaturstandes entsprechend dem aktuellen Wert an.
   Beachten Sie weiters, dass auch die Beschriftung des Thermometers (max, min Temperatur) angepasst werden soll.
   */
    drawOriginalSvg(id, src);
    // min/max neben Thermometer schreiben
    // current bestimmt Höhe des Balkens
}


//function drawBulb(id, src, min, max, current, values) {
function drawBulb(id, src, controlUnits) {
    drawOriginalSvg(id, src);
    // current 0/1: aus/ein
    // ein: gelb
    // aus: schwarz
}

//function drawCam(id, src, min, max, current, values) {
function drawCam(id, src, controlUnits) {
    /*
    Verändern Sie die Darstellung der Webcam entsprechend den Vorgaben aus der Angabe.
    Dabei soll jedoch nicht nur einfach die Farbe der Elemente verändert werden, sondern es soll eine Kopie der zu verändernden Elemente erstellt
     und anschließend die aktuellen durch die angepassten Kopien ersetzt werden.
    */
    drawOriginalSvg(id, src);
    // current 0: aus, 1: ein
    // aus: innen schwarz
    // ein: innen blau
}

//function drawShutter(id, src, min, max, current, values) { // current, values
function drawShutter(id, src, controlUnits) { // current, values
    drawOriginalSvg(id, src);
    // "Laden" je nach Wert in current ein/ausblenden
    // 0: offen nur oberstes
    // 1: halb obere 2
    // 2: geschlossen alle 4
}

function drawOriginalSvg(id, src) {
    var selector = '#' + id + " .device-image";
    $(selector).svg();
    var svg = $(selector).svg('get');
    svg.load(src, {addTo: true, changeSize: false});//, onLoad: shutterOnLoad});
}
/*function shutterOnLoad(svg, error) {
    alert("shutteronload " + svg + "\nerror " + error);
}*/