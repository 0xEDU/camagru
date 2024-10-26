export default function insertElement(elementId, innerHtml) {
    const targetElement = document.getElementById(elementId);

    if (targetElement) {
      targetElement.insertAdjacentHTML('beforeend', innerHtml);
    } else {
        console.error(`Target element with ID '${elementId}' not found.`);
    }
}