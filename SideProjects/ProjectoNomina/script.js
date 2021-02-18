document.getElementById('calcular').onclick = () => {
    let salarioBase = parseFloat(document.getElementById("salarioBase").value) || 0;

    let numeroHorasNormales = parseFloat(document.getElementById("horasExtraNormalesHoras").value) || 0;
    let valorHorasNormales = parseFloat(document.getElementById("horasExtraNormalesDinero").value) || 0;
    let numeroHorasFuerza = parseFloat(document.getElementById("horasExtraMayorHoras").value) || 0;
    let valorHorasFuerza = parseFloat(document.getElementById("horasExtraMayorDinero").value) || 0;

    let salarioEspecie = parseFloat(document.getElementById("salarioEspecie").value) || 0;

    let grupoProf = parseInt(document.getElementById("grupoProf").value) || 1;
    let contratoIndef = document.getElementById("contratoIndef").checked == true;

    let salarial1 = parseFloat(document.getElementById("salarialUno").value) || 0;
    let salarial2 = parseFloat(document.getElementById("salarialDos").value) || 0;
    let salarial3 = parseFloat(document.getElementById("salarialTres").value) || 0;

    let locoTotal = parseFloat(document.getElementById("locoTotal").value) || 0;
    let locoJusti = parseFloat(document.getElementById("locoJusti").value) || 0;
    let locoKm = parseFloat(document.getElementById("locoKm").value) || 0;
    let locoJustiFinal = locoKm * 0.19 + locoJusti;
    if (locoJustiFinal > locoTotal) locoJustiFinal = locoTotal;
    let locoNOJustiFinal = locoTotal - locoJustiFinal;

    let dietasTotal = parseFloat(document.getElementById("dietasTotal").value) || 0;
    let dietasEstancia = parseFloat(document.getElementById("dietasEstancia").value) || 0;
    let dietasDias = parseInt(document.getElementById("dietasDias").value) || 0;
    let dietasPernocta = document.getElementById("dietasPernocta").checked == true;
    let dietasExtranjero = document.getElementById("dietasExtranjero").checked == true;
    let dietasJustiFinal = dietasEstancia;
    if (dietasPernocta) {
        if (dietasExtranjero) {
            dietasJustiFinal += dietasDias * 91.35;
        }
        else {
            dietasJustiFinal += dietasDias * 53.34;
        }
    }
    else {
        if (dietasExtranjero) {
            dietasJustiFinal += dietasDias * 48.08;
        }
        else {
            dietasJustiFinal += dietasDias * 26.67;
        }
    }
    if (dietasJustiFinal > dietasTotal) dietasJustiFinal = dietasTotal;
    let dietasNOJustiFinal = dietasTotal - dietasJustiFinal;


    let otrosTotal = parseFloat(document.getElementById("otroTotal").value) || 0;
    let otrosJusti = parseFloat(document.getElementById("otroJusti").value) || 0;
    if (otrosJusti > otrosTotal) otrosJusti = otrosTotal;
    let otrosNOJusti = otrosTotal - otrosJusti;

    let valorPagaExtra = parseFloat(document.getElementById("valorPagaExtra").value) || 0;
    let numeroPagaExtra = parseFloat(document.getElementById("numPagaExtra").value) || 2;
    let recibePagaExtra = document.getElementById("recibePagaExtra").checked == true;
    let ppe = numeroPagaExtra * valorPagaExtra / 12;
    let importePaga = (document.getElementById("pagaPro").checked == true ? ppe : valorPagaExtra);

    let irpfPorcentaje = parseFloat(document.getElementById("irpfPorcen").value) || 0;


    let salarioBruto = salarioBase + salarioEspecie + salarial1 + salarial2 + salarial3 + locoTotal + dietasTotal + otrosTotal + (numeroHorasNormales * valorHorasNormales + numeroHorasFuerza * valorHorasFuerza) + (recibePagaExtra || (document.getElementById("pagaPro").checked == true) ? importePaga : 0);

    let bccc = salarioBase + salarioEspecie + salarial1 + salarial2 + salarial3 + locoNOJustiFinal + dietasNOJustiFinal + otrosNOJusti + ppe;
    let bcccReal = checkGroup(bccc, grupoProf);
    let bccp = bccc + (valorHorasNormales * numeroHorasNormales + valorHorasFuerza * numeroHorasFuerza);
    let bccpReal = checkGroup(bccp, 7);
    let bche = valorHorasNormales * numeroHorasNormales + valorHorasFuerza * numeroHorasFuerza;    
    
    document.getElementById("primerRes").innerHTML = "(" + numeroPagaExtra + " x " + valorPagaExtra.toFixed(2) + ") / 12 = " + (numeroPagaExtra * valorPagaExtra / 12).toFixed(2) + " €";
    
    document.getElementById("segundoRes").innerHTML = salarioBase.toFixed(2) + " + " + salarioEspecie.toFixed(2) + " + (" + (salarial1 + salarial2 + salarial3).toFixed(2) + ") + (" + (locoTotal + dietasTotal + otrosTotal).toFixed(2) + ") + " + (numeroHorasNormales * valorHorasNormales + numeroHorasFuerza * valorHorasFuerza).toFixed(2) + " + " + (recibePagaExtra || (document.getElementById("pagaPro").checked == true) ? importePaga.toFixed(2) : 0.00) + " = ";
    document.getElementById("brutoRes").innerHTML = salarioBruto.toFixed(2) + " €";
    
    document.getElementById("tresUnoRes").innerHTML = salarioBase.toFixed(2) + " + " + salarioEspecie.toFixed(2) + " + (" + (salarial1 + salarial2 + salarial3).toFixed(2) + ") + (" + (dietasNOJustiFinal + locoNOJustiFinal + otrosNOJusti).toFixed(2) + ") + " + ppe.toFixed(2) + " = " + bccc.toFixed(2) + " €" + (bccc != bcccReal ? (" X " + bcccReal.toFixed(2) + " €") : " ✓");
    document.getElementById("tresDosRes").innerHTML = bccc.toFixed(2) + " + " + (valorHorasNormales * numeroHorasNormales + valorHorasFuerza * numeroHorasFuerza).toFixed(2) + " = " + bccp.toFixed(2) + " €" + (bccp != bccpReal ? (" X " + bccpReal.toFixed(2) + " €") : " ✓");
    document.getElementById("tresTresRes").innerHTML = (valorHorasNormales * numeroHorasNormales).toFixed(2) + " + " + (valorHorasFuerza * numeroHorasFuerza).toFixed(2) + " = " + bche.toFixed(2) + " €";
    
    bccc = bcccReal;
    bccp = bccpReal;
    
    let cuotaCC = bccc * 4.7 / 100;
    let cuotaDes = bccp * (contratoIndef ? 1.55 : 1.6) / 100;
    let cuotaFp = bccp * 0.1 / 100;
    let cuotaHen = (valorHorasNormales * numeroHorasNormales) * 4.7 / 100;
    let cuotaHefm = (valorHorasFuerza * numeroHorasFuerza) * 2 / 100;
    let cuotaSsTotal = cuotaCC + cuotaDes + cuotaFp + cuotaHen + cuotaHefm;

    let baseIrpf = salarioBruto - (dietasJustiFinal + locoJustiFinal + otrosJusti);
    let cuotaIRPF = baseIrpf * irpfPorcentaje / 100;
    
    let salarioNeto = salarioBruto - cuotaSsTotal - cuotaIRPF;    

    document.getElementById("baseCC").innerHTML = bccc.toFixed(2) + " €";
    document.getElementById("cuotaCC").innerHTML = cuotaCC.toFixed(2) + " €";
    document.getElementById("baseDes").innerHTML = bccp.toFixed(2) + " €";
    document.getElementById("tipoDes").innerHTML = (contratoIndef ? "1.55%" : "1.6%");
    document.getElementById("cuotaDes").innerHTML = cuotaDes.toFixed(2) + " €";
    document.getElementById("baseFP").innerHTML = bccp.toFixed(2) + " €";
    document.getElementById("cuotaFP").innerHTML = cuotaFp.toFixed(2) + " €";
    document.getElementById("baseHEn").innerHTML = (valorHorasNormales * numeroHorasNormales) + " €";
    document.getElementById("cuotaHEn").innerHTML = cuotaHen.toFixed(2) + " €";
    document.getElementById("baseHEfm").innerHTML = (valorHorasFuerza * numeroHorasFuerza) + " €";
    document.getElementById("cuotaHEfm").innerHTML = cuotaHefm.toFixed(2) + " €";
    document.getElementById("cuotaSsTotal").innerHTML = cuotaSsTotal.toFixed(2) + " €";

    document.getElementById("cincoUnoRes").innerHTML = salarioBruto.toFixed(2) + " - (" + dietasJustiFinal + " + " + locoJustiFinal + " + " + otrosJusti + ") = " + baseIrpf.toFixed(2) + " €";
    document.getElementById("cincoDosRes").innerHTML = baseIrpf.toFixed(2) + " x " + irpfPorcentaje + "% = ";
    document.getElementById("cincoTresRes").innerHTML = cuotaIRPF.toFixed(2) + " €";

    document.getElementById("seisUnoRes").innerHTML = salarioBruto.toFixed(2) + " - " + cuotaSsTotal.toFixed(2) + " - " + cuotaIRPF.toFixed(2) + " = ";
    document.getElementById("seisDosRes").innerHTML = salarioNeto.toFixed(2) + " €";

    document.getElementById("res").style.display = "block";
    return false;
}

function checkGroup(base, grupo) {
    if (base > 4070.10) return 4070.10;
    switch (grupo) {
        case 1:
            if (base < 1547) {
                return 1547;
            }
            return base;

        case 2:
            if (base < 1282.80) {
                return 1282.80;
            }
            return base;
        case 3:
            if (base < 1116) {
                return 1116;
            }
            return base;
        case 4:
        case 5:
        case 6:
        case 7:
            if (base < 1108.33) {
                return 1108.33;
            }
            return base;
        default:
            break;
    }
}