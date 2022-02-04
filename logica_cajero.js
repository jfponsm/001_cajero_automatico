class Billete	//Crea la clase Billete
{
	constructor(valor, cantidad)	//Clase billete tiene valor y cantidad
	{
		this.valor = valor;
		this.cantidad = cantidad;
	}
}

var caja = [];	//Crea el array caja, adentro tiene valor y cantidad
var entregado = [];	//Array de billetes entregados al usuario.
caja.push( new Billete(100, 100) );
caja.push( new Billete(50, 100) );	//Pongo 100 billetes de $50.
caja.push( new Billete(20, 100) );
caja.push( new Billete(10, 100) );
caja.push( new Billete(5, 100) );
var dinero = 0;
var div = 0;
var papeles = 0;

contar_caja();	//cuenta cuanto dinero hay al momento de empezar

var resultado = document.getElementById("resultado");		//resultado en la pagina HTML
var alerta = document.getElementById("alerta_recarga");		//alertar recarga en la pagina HTML
var boton = document.getElementById("extraer");		//asigna a boton el evento click
boton.addEventListener("click", entregarDinero);	//cuando hay click, ejecutar entregarDinero()

function entregarDinero()
{
	var cajatexto = document.getElementById("dinero");
	dinero = parseInt(cajatexto.value);
	if (total_caja >= dinero)	//verifica si hay mas dinero en la caja que lo que pide el cliente
	{
		for(var bill of caja)
		{
			if(dinero > 0)
			{
				div = Math.floor(dinero/bill.valor);
				if(div > bill.cantidad)
				{
					papeles = bill.cantidad;
				}
				else
				{
					papeles = div;
				}
				bill.cantidad -= papeles;	//aca quitamos la cantidad de billetes entregados de la caja
				entregado.push(new Billete(bill.valor, papeles));
				dinero -= bill.valor * papeles;
			}
		}
		if(dinero == 0)
		{
			resultado.innerHTML = "Se ha retirado: <br />"
			for (var e of entregado)
			{
				if(e.cantidad > 0)
				{
					resultado.innerHTML += e.cantidad + " billetes de $" + e.valor + "<br />";
				}
			}
			contar_caja();	//cuento el dinero disponible para emitir alerta si no hay mas dinero
			console.log(total_caja);
			entregado = [];
			if (total_caja == 0)	//emite una alerta si la operacion en curso vacio el cajero
			{
				alerta.innerHTML = "Cajero automatico vacio, recarga solicitada."
			}
		}
		else
		{
			resultado.innerHTML = "No tengo billetes para entregar esa suma, prueba otra."
		}
		console.log(caja);
	}
	else
	{
		resultado.innerHTML = "No hay suficiente dinero!"
	}
}

function contar_caja()	//cuenta cuanto dinero hay disponible en la caja y lo devuelve en total_caja
{
	total_caja = 0;
	for (var tot of caja)
	{
		total_caja += tot.valor * tot.cantidad;
	}
}








