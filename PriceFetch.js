const ethers = require('ethers');
const { facetoryAddress, routerAddress, formAddress, toAddress} = require("./AddressList");
const {erc20ABI, factoryABI, routerAbi} = require("./AbiInfo");

const provider = new ethers.providers.JsonRpcProvider(
    "https://bsc-dataseed1.binance.org/"
);
const factoryInstance = new ethers.Contract(
    facetoryAddress,
    factoryABI,
    provider
)

// console.log(factoryInstance)

const routerInstance = new ethers.Contract(
    routerAddress, 
    routerAbi,
    provider
)
const priceFetch = async (humanFormat) =>{
    const token1 = new ethers.Contract(
        formAddress, erc20ABI, provider
    )   
    const token2 = new ethers.Contract(
        toAddress, erc20ABI, provider
    )

    const decimal = await token1.decimals()
    // console.log("decimal for token  : " , decimal);
    const amountIn = ethers.utils.parseUnits(humanFormat,decimal).toString();
    // console.log("amount In : " , amountIn)
    const amountOut = await routerInstance.getAmountsOut(amountIn, [formAddress, toAddress])
    // console.log("amount Out   : " , amountOut)
    const humanOutput = ethers.utils.formatUnits(
        amountOut[1].toString(),decimal
    )
    console.log("100 BNB to WBNB  : " , humanOutput)
 

}

 
priceFetch("100")