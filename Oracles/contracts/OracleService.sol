pragma solidity > 0.6.1 < 0.7.0;

import "./provableAPI_0.6.sol";

contract OracleTest is usingProvable {

    uint public randomNumber;
    uint public ethPrice;
    uint public btcPrice;

    enum oraclizeState { random, ethprice, btcprice }

    struct oraclizeCallback {
        oraclizeState oState;
    }

    mapping (bytes32 => oraclizeCallback) oraclizeCallbacks;
    mapping(bytes32 => bool) validIds;

    event LogConstructorInitiated(string message);
    event LogNewProvableQuery(string description);
    event LogQueryId(bytes32 queryID);
    // event LogCallbackResult(string message);

    // bytes32 rngId = provable_query(
    //     "nested",
    //     "[URL] ['json(https://api.random.org/json-rpc/1/invoke).result.random[\"serialNumber\",\"data\"]', '\\n{\"jsonrpc\":\"2.0\",\"method\":\"generateSignedIntegers\",\"params\":{\"apiKey\":${[decrypt] BKg3TCs7lkzNr1kR6pxjPCM2SOejcFojUPMTOsBkC/47HHPf1sP2oxVLTjNBu+slR9SgZyqDtjVOV5Yzg12iUkbubp0DpcjCEdeJTHnGwC6gD729GUVoGvo96huxwRoZlCjYO80rWq2WGYoR/LC3WampDuvv2Bo=},\"n\":1,\"min\":1,\"max\":100,\"replacement\":true,\"base\":10${[identity] \"}\"},\"id\":1${[identity] \"}\"}']",
    //     gasForOracalize
    // );

    // GAS problems
    // strConcat('\n{"jsonrpc": "2.0", "method": "generateSignedIntegers", "params": { "apiKey": "5e53c82d-bdc9-4a29-aa27-0eac7f754c3a", "n": 1, "min":', _min ,', "max":', _max ,', "replacement": true, "base": 10 }, "id": 14215 }')

    constructor() payable public {
        // provable_setProof(proofType_TLSNotary | proofStorage_IPFS);
        emit LogConstructorInitiated("Constructor was initiated. Ready to send the Provable Query.");
    }

    function __callback(bytes32 _myId, string memory _result) virtual public override {
        require(msg.sender == provable_cbAddress());
        require(validIds[_myId]);
        // emit LogCallbackResult('Callback called, Result is ready');


        oraclizeCallback memory OC = oraclizeCallbacks[_myId];
        if(OC.oState == oraclizeState.random) {
            // emit LogCallbackResult('Callback called, Result is ready', _result);
            randomNumber = parseInt(_result);
            validIds[_myId] = false;
        }

        if(OC.oState == oraclizeState.ethprice) {
            // emit LogCallbackResult('Callback called, Result is ready', _result);
            ethPrice = parseInt(_result, 2);
            validIds[_myId] = false;
        }

        if(OC.oState == oraclizeState.btcprice) {
            // emit LogCallbackResult('Callback called, Result is ready', _result);
            btcPrice = parseInt(_result, 2);
            validIds[_myId] = false;
        }
        //Using delete on an array leaves a gap. The length of the array remains the same. If you want to remove the empty position
        // you need to shift items manually and update the length property.
        // delete validIds[_myId];
    }


    function getRandomNumber() payable public {
        if (provable_getPrice("URL") > address(this).balance) {
            emit LogNewProvableQuery("Provable query was NOT sent, please add some ETH to cover for the query fee");
        } else {
            emit LogNewProvableQuery("Provable query was sent, standing by for the answer..");
            bytes32 _id = provable_query(
                "URL",
                'json(https://api.random.org/json-rpc/2/invoke).result.random.data',
                '\n{"jsonrpc": "2.0", "method": "generateSignedIntegers", "params": { "apiKey": "00000000-0000-0000-0000-000000000000", "n": 1, "min": 1, "max": 100, "replacement": true, "base": 10 }, "id": 14215 }'
            );
            validIds[_id] = true;
            oraclizeCallbacks[_id] = oraclizeCallback(oraclizeState.random);
            emit LogQueryId(_id);
        }
    }


    function getEthPrice() payable public {
        if (provable_getPrice("URL") > address(this).balance) {
            emit LogNewProvableQuery("Provable query was NOT sent, please add some ETH to cover for the query fee");
        } else {
            emit LogNewProvableQuery("Provable query was sent, standing by for the answer..");
            bytes32 _id = provable_query(
                "URL",
                'json(https://api.pro.coinbase.com/products/ETH-USD/ticker).price'
            );
            validIds[_id] = true;
            oraclizeCallbacks[_id] = oraclizeCallback(oraclizeState.ethprice);
            emit LogQueryId(_id);
        }

    }

    function getBtcPrice() payable public {
        if (provable_getPrice("URL") > address(this).balance) {
            emit LogNewProvableQuery("Provable query was NOT sent, please add some ETH to cover for the query fee");
        } else {
            emit LogNewProvableQuery("Provable query was sent, standing by for the answer..");
            bytes32 _id = provable_query(
                "URL",
                'json(https://api.pro.coinbase.com/products/BTC-USD/ticker).price'
            );
            validIds[_id] = true;
            oraclizeCallbacks[_id] = oraclizeCallback(oraclizeState.btcprice);
            emit LogQueryId(_id);
        }

    }

}