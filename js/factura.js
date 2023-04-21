document.getElementById('generar').addEventListener('click', function(){generarConceptos()});
document.getElementById('aconcepto').addEventListener('click', function(){agregarConceptos()});
let conceptos = document.getElementById('conceptos').innerHTML;

let generarConceptos = function()
{
    let num = document.getElementById('numero').value;

    if(num > 0)
        {
            for(let i = 0; i < num; i++)
            {
                conceptos += '<div id = "concepto'+ i + '">';
                conceptos += estructuraConcepto(i);
                conceptos += '</div>';
            }

            document.getElementById('conceptos').innerHTML = conceptos;
            document.getElementById('generar').classList.add('quitar-titulo-conceptos');
            document.getElementById('aconcepto').classList.add('mostrar-agregar');
            document.getElementById('previsualizar').classList.add('mostrar-agregar');
        }
}

function estructuraConcepto(num)
{
        //las comillas invertidas ( `` ) se diran que son templates y agregan este codigo como html
        return`
        <legend>Conceptos: </legend>
        <br>
        <label >
               <p>Cantidad: </p>
                   <input type="number" name="cantidad" id="cantidad${num}" value="0" onblur="calcularImporte(${num})"/>
               </label>
               <label >
                   <p>DescripciÃ³n: </p>
                   <input type="text" name="descripcion" placeholder="DescripciÃ³n"></input>
               </label>
               <label >
                   <p>Valor Unitario: </p>
                   <input type="number" name="valorUnitario" id="valorUnitario${num}" value="0.00" step="0.01" onblur="calcularImporte(${num})"/>
               </label>
               <label >
                   <p>Importe: </p>
                   <input type="number" name="importe" id="importe${num}" value="0.00" step="0.01" disable>
               </label>
               <label >
               <img src="./img/icon/icono2.jpg" width="38px" height="38px" id="icono" onclick="borrarConceptos(${num})"/>
               </label>
               `
}

let calcularImporte = function(x)
{
    document.getElementById('importe' + x).value = 
        document.getElementById('cantidad' + x).value * 
        document.getElementById('valorUnitario' + x).value;

        calcularRestantes();

}

let calcularRestantes = function()
{
    let importes = document.getElementsByName('importe');

    let j = subtotal = 0;

    while(j < importes.length)
    {
        subtotal += parseFloat(importes[j].value);
        j++;
    }

    document.getElementById('sustotal').innerText = subtotal.toFixed(2);
    document.getElementById('ivaxd').innerText = (subtotal * 0.16).toFixed(2);
    document.getElementById('totalxd').innerText = (subtotal * 1.16).toFixed(2);
}

let agregarConceptos = function()
{
    let num = document.getElementById('conceptos').childElementCount;
    let hola = document.getElementsByClassName('wows');
    let contenidoo;
    num = parseInt(num);
    num = num + 1;
    
            sir = document.createElement('div');
            sir.setAttribute('id','concepto'+num);
            sir.innerHTML = estructuraConcepto(num);

            contenidoo = document.createTextNode(estructuraConcepto(num));
        
            hola[0].appendChild(sir);

            console.log(sir);
}

let borrarConceptos =  function(num)
{
    let totalxd = document.getElementById('conceptos')
    let posicion = totalxd.querySelector('#concepto' + num);
    totalxd.removeChild(posicion);

    calcularRestantes();
}

document.getElementById('previsualizar').addEventListener('click',function(){generarFactura()});

let generarFactura =  function(){
    let generales = document.getElementsByClassName('datos-receptor');
    
    let receptor = [generales[0].value, generales[1].value];
    
    //console.table(receptor);
    
    let cantidades = document.getElementsByName('cantidad');
    let descripciones = document.getElementsByName('descripcion');
    let valoresUnitarios = document.getElementsByName('valorUnitario');
    let importes = document.getElementsByName('importe');
    
    let factura =[];
    for(let i=0; i < cantidades.length; i++){
        factura [i] = {
            cantidad: cantidades[i].value,
            descripcion: descripciones[i].value,
            valorUnitario: valoresUnitarios[i].value,
            importe: importes[i].value
        }
    }
    //console.table(factura);
    
    let totales = document.getElementById('tabla').innerHTML;
    //console.log(totales);
    
    //Storage
        //sessionStorage
        /*sessionStorage.setItem('receptor',JSON.stringify(receptor));
        sessionStorage.setItem('conceptos',JSON.stringify(factura));
        sessionStorage.setItem('tabla',totales);*/
        
        
    //LocalStorage
        localStorage.setItem('receptor',JSON.stringify(receptor));
        localStorage.setItem('conceptos',JSON.stringify(factura));
        localStorage.setItem('tabla',totales);
        
        window.open('detalles.html');
}