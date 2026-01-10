
// atmMachine(policies, state)
const state = {
  balanceHistory: [
    { id: 123, amountPresent: 124, date: 1234 }
  ],

  fullName: "asdasda",
  pin: 1234,
  enteredPin: 1234,
  validDate: "12/12/2029",

  previousPinHistory: [
    { oldPin: 1234, newPin: 1235, date: 123567 },
    { oldPin: 1236, newPin: 12323, date: 123567 }
  ]
};


// pin policy

function pinPolicy(state) {
  if (typeof state.enteredPin !== "number") {
    return { success: false, error: "entered pin missing" };
  }

  if (state.enteredPin !== state.pin) {
    return { success: false, error: "wrong pin" };
  }

  return { success: true };
}


// full name validation

function namePolicy(state) {
  if (!state.fullName) {
    return { success: false, error: "name missing" };
  }

  if (state.fullName.length < 3) {
    return { success: false, error: "name too short" };
  }

  return { success: true };
}

//pin reuse policy

function namePolicy(state) {
  if (!state.fullName) {
    return { success: false, error: "name missing" };
  }

  if (state.fullName.length < 3) {
    return { success: false, error: "name too short" };
  }

  return { success: true };
}

//pin reuse policy
function pinHistoryPolicy(state) {
  const reused = state.previousPinHistory.some(
    p => p.oldPin === state.enteredPin || p.newPin === state.enteredPin
  );

  if (reused) {
    return { success: false, error: "pin reused from history" };
  }

  return { success: true };
}


//main function
function atmMachine(policies, state) {
  // error handling
  if (!Array.isArray(policies)) {
    return { success: false, error: "policies must be an array" };
  }

  if (!state || typeof state !== "object") {
    return { success: false, error: "invalid state" };
  }

  // run policies one by one
  for (let i = 0; i < policies.length; i++) {
    const policy = policies[i];

    if (typeof policy !== "function") {
      return { success: false, error: "invalid policy" };
    }

    const result = policy(state);

    if (!result || result.success === false) {
      return {
        success: false,
        error: result?.error || "policy failed"
      };
    }
  }

  return { success: true, message: "all policies passed" };
}


//
const res1 = atmMachine(
  [pinPolicy],
  state
);

console.log(res1);


const res2 = atmMachine(
  [namePolicy],
  state
);

console.log(res2);


const res3 = atmMachine(
  [pinPolicy, namePolicy, pinHistoryPolicy],
  state
);

console.log(res3);



