// 1.- Creación de observables -> Función create
export const displayLog = (content: any)=> {
    let element = document.createElement('div');
    element.innerHTML = content;
    const logContainer = document.getElementById("log-container");
    logContainer?.appendChild(element);
}

// 1.- Creación de observables -> Suscripciones y observadores
export const displayLog2 = (content: any)=> {
    let element = document.createElement('div');
    element.innerHTML = content;
    const logContainer = document.getElementById("log-container-2");
    logContainer?.appendChild(element);
}
