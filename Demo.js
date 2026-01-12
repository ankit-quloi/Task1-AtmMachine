
const state = {

cardInserted: true,
  fullName: "ankit",
  pin: 1582,
  enteredPin: 1582,
  validDate: "2027-01-15",

  previousPinHistory: [
    { oldPin: 1234, newPin: 1235, date: "2024-01-06" },
    { oldPin: 1236, newPin: 12323, date: "2025-01-07" }
  ]
};

function cardPolicy(state) {
  if (state.cardInserted !== true) {
    return { ok: false, error: "please insert ATM card" };
  }
  return { ok: true };
}



function pinPolicy(state) {
  if (typeof state.enteredPin !== "number") {
    return { ok: false, error: "pin must be number" };
  }

  if (state.enteredPin !== state.pin) {
    return { ok: false, error: "wrong pin" };
  }

  return { ok: true };
}

function pinHistoryPolicy(state) {
  const history = state.previousPinHistory || [];

  const reused = history.some(
    p => p.oldPin === state.enteredPin || p.newPin === state.enteredPin
  );

  if (reused) {
    return { ok: false, error: "pin reused before" };
  }

  return { ok: true };
}

function namePolicy(state) {
  if (!state.fullName) {
    return { ok: false, error: "name missing" };
  }

  if (state.fullName.length < 3) {
    return { ok: false, error: "name too short" };
  }

  return { ok: true };
}

function validDatePolicy(state) {
  const d = new Date(state.validDate);

  if (isNaN(d.getTime())) {
    return { ok: false, error: "invalid date format" };
  }

  if (d < new Date()) {
    return { ok: false, error: "account expired" };
  }

  return { ok: true };
}

const policies = [
    cardPolicy,  
  pinPolicy,
  pinHistoryPolicy,
  namePolicy,
  validDatePolicy
];


function evaluatePolicies(policies, state) {
  for (let i = 0; i < policies.length; i++) {
    const result = policies[i](state);

    if (!result || typeof result.ok !== "boolean") {
      return { ok: false, error: "invalid policy response" };
    }

    if (result.ok === false) {
      return result;
    }
  }

  return { ok: true };
}

function handleResult(result) {
  if (!result || result.ok === false) {
    console.log("failed:", result.error);
  } else {
    console.log("success: all policies passed");
  }
}

// emp managment system

const Empstate = {
  idcard: true,
  fullName: "ankit",
  designation: "Full Stack Developer",
  department: "Development",
  salary: 200000,
  checkIn: true,
  checkOut: true,
  checkInTime: "09:10",
  checkInDate: "2026-01-12",

  checkOutTime: "18:05",
  checkOutDate: "2026-01-12"
};

function empIdCard(state) {
  if (state.idcard !== true) {
    return { ok: false, error: "Employee ID card missing" };
  }
  return { ok: true };
}

function empName(state) {
  if (typeof state.fullName !== "string") {
    return { ok: false, error: "Employee name must be a string" };
  }


  if (state.fullName.trim().length < 3) {
    return { ok: false, error: "Employee name too short" };
  }

  return { ok: true };
}

function empCheckIn(state) {
  if (state.checkIn === true) {
    console.log(` ${state.fullName} check-in successful`);
    return { ok: true };
  }

  console.log(` ${state.fullName} has not checked in yet`);
  return { ok: false, error: "Employee not checked in" };
}


function empCheckOut(state) {
  if (state.checkOut === true) {
    console.log(` ${state.fullName} check-out successful`);
    return { ok: true };
  }

  console.log(`${state.fullName} has not checked out yet`);
  return { ok: false, error: "Employee not checked out" };
}

function empThanks(state) {
  console.log(` Thanks for working, ${state.fullName}`);
  return { ok: true };
}

function getWorkingMinutes(state) {
  const inDateTime = new Date(`${state.checkInDate}T${state.checkInTime}`);
  const outDateTime = new Date(`${state.checkOutDate}T${state.checkOutTime}`);

  const diffMs = outDateTime - inDateTime;
  return Math.floor(diffMs / 60000); 
}

function empSummary(state) {
  const minutes = getWorkingMinutes(state);
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  console.log("\n Employee Details");
  console.log("Name:", state.fullName);
  console.log("Designation:", state.designation);
  console.log("Department:", state.department);
  console.log("Check-in:", state.checkInDate, state.checkInTime);
  console.log("Check-out:", state.checkOutDate, state.checkOutTime);

  console.log(` Today's Working Time: ${hours} hours ${mins} minutes`);

  return { ok: true };
}



const empPolicies=[
    empIdCard,
    empName,
    empCheckIn,
    empCheckOut,
    empThanks,
    empSummary
]

function atmMac(policies, state) {
  if (!Array.isArray(policies)) {
    return handleResult({ ok: false, error: "policies must be array" });
  }

  if (!state || typeof state !== "object") {
    return handleResult({ ok: false, error: "invalid state" });
  }

  const result = evaluatePolicies(policies, state);
  handleResult(result);
}


atmMac(policies, state);
atmMac(empPolicies, Empstate)