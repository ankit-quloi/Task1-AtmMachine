const policies = {
  iscardvalid: (hascard) => hascard,
  ispinvalid: (entered, correct) => entered === correct,
  isbalance: (amount) => amount > 0 && amount < 10000
};

const state = {
  cardchek: "cardchek",
  pinchek: "pinchek",
  policieschek: "policieschek",
  deposite: "deposite",
  succes: "succes"
};

function atmMachine({ hascard, enteredpin, correctpin, balance, depositamount }) {
  let currentstate = state.cardchek;

  while (true) {
    switch (currentstate) {

      case state.cardchek:
        if (!policies.iscardvalid(hascard)) 
            return "policy failed: invalid atm card";
        currentstate = state.pinchek;
        break;

      case state.pinchek:
        if (!policies.ispinvalid(enteredpin, correctpin)) 
            return "policy failed: wrong pin";
        currentstate = state.policieschek;
        break;

      case state.policieschek:
        if (!policies.isbalance(depositamount)) 
            return "policy failed: deposit limit exceeded";
        currentstate = state.deposite;
        break;

      case state.deposite:
        balance += depositamount;
        currentstate = state.succes;
        break;

      case state.succes:
        return `deposit succesful. new balance: ${balance}`;
    }
  }
}

const res = atmMachine({
  hascard: false,
  enteredpin: 1235,
  correctpin: 1234,
  balance: 0,
  depositamount: 200000
});

console.log(res);
  