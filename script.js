const btn = document.querySelector(".btn");
const option = document.querySelectorAll("option");
const resultado = document.querySelector(".resultado");

async function converteMoeda(e) {
  e.preventDefault();
  const primeiraMoeda = document.querySelector(".opcao1");
  const segundaMoeda = document.querySelector(".opcao2");
  const qtd = document.querySelector(".qtd");

  try {
    await fetch(
      `https://api.invertexto.com/v1/currency/${primeiraMoeda.value}_${segundaMoeda.value}?token=2566|3cOcozUguvHkXUv7vI1xW2jIyuiqPPJR`
    )
      .then((r) => r.json())
      .then((res) => {
        if (primeiraMoeda.value === segundaMoeda.value) {
          resultado.innerText = "MOEDA NÃO DEFINIDA";
          primeiraMoeda.classList.add("erroInput");
          segundaMoeda.classList.add("erroInput");
          resultado.classList.add("erro");
          resultado.style.color = "#fff";
        } else {
          primeiraMoeda.classList.remove("erroInput");
          segundaMoeda.classList.remove("erroInput");
          resultado.classList.remove("erro");

          const valorPrice = ({ price } =
            res.BRL_USD ||
            res.BRL_EUR ||
            res.USD_EUR ||
            res.USD_BRL ||
            res.EUR_BRL ||
            res.EUR_USD);

          resultado.innerText = `${qtd.value} ${primeiraMoeda.value} = ${
            qtd.value * valorPrice.price.toFixed(2)
          } ${segundaMoeda.value}`;
        }
      });
    resultado.classList.add("block");
  } catch {
    console.log("Moeda não definida");
  }
  return;
}

btn.addEventListener("click", converteMoeda);

//https://api.invertexto.com/v1/currency/´${Valor da primeira moeda}_${Valor da segunda moeda}´?token=2566|3cOcozUguvHkXUv7vI1xW2jIyuiqPPJR
