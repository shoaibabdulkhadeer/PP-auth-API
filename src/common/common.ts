import { isExpired, decodeToken } from "react-jwt";
import { JSEncrypt } from "jsencrypt";
import { key } from "../utils/keys";
//Fuction For Decode JWT Token
function decode(token: any) {
  const myDecodedToken: any = decodeToken(token);
  const expTokenTime: boolean = isExpired(token);
  const logedInUserEmpID = myDecodedToken?.EmployeeGuID;
  const currentRole = myDecodedToken?.RoleName;
  return { myDecodedToken, expTokenTime, logedInUserEmpID, currentRole };
}

//Fuction For Get Depatment id
const getDepartmentId = (dept: any, department: any[]) => {
  for (let i = 0; i < department.length; i++) {
    if (department[i].DepartmentName === dept) {
      return department[i].DepartmentId;
    }
  }
};
//Fuction For Get designation id
const getDesignationId = (desig: any, designation: any[]) => {
  for (let i = 0; i < designation.length; i++) {
    if (designation[i].DesignationName === desig) {
      return designation[i].DesignationId;
    }
  }
};

//Fuction For Get Role id
const getRoleID = (roles: any, rolesState: any[]): number[] => {
  const DefaultRoleId = 3;
  const roleIds = [DefaultRoleId];
  for (let i = 0; i < roles?.length; i++) {
    for (let j = 0; j < rolesState.length; j++) {
      let role = rolesState[j];
      if (role.RoleName === roles[i]) {
        roleIds.push(role.RoleId);
      }
    }
    // const foundRole = rolesState.find((role) => role.RoleName.trim() === roles[i].trim());
  }

  return roleIds;
};

//Fuction For Get Role name Arguments(array({rolename,roleid}) ,roleid)
const getRoleName = (roles: any[], role: string) => {
  for (let i = 0; i < roles?.length; i++) {
    const foundRole = roles.find((r: any) => r.RoleId === role);
    if (foundRole) {
      return foundRole.RoleName;
    }
  }
};

//Fuction For Get Date (01-Nov-2023) and arg timestamp only
const getFormattedDate = (timeStap?: any, date?: string) => {
  if (timeStap) {
    return new Date(Number(timeStap) * 1000).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  }
  if (date) {
    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  }

  return "NA";
};

//Function For Get Title Case
const getTitleCase = (str: string) => {
  let value: string[] = str?.split(" ");
  if (value?.length === 1) {
    if (value[0].length <= 3) {
      return value[0].toUpperCase();
    }
    let firstLetter = value[0].charAt(0).toUpperCase();
    let remainingLetters = value[0].substring(1).toLowerCase();
    return firstLetter + remainingLetters;
  }
  let titleCase = value?.map((word) => {
    if (word.length <= 1) {
      return word.toUpperCase();
    }
    if (word.length > 3) {
      let firstLetter = word.charAt(0).toUpperCase();
      let remainingLetters = word.substring(1).toLowerCase();
      return firstLetter + remainingLetters;
    }
    return word;
  });
  return titleCase?.join(" ");
};

const getProjectColor = (status: boolean) => {
  if (status) {
    return "#61C0C2";
  } else {
    return "#f49595";
  }
};

export {
  getDesignationId,
  getDepartmentId,
  getRoleID,
  getRoleName,
  decode,
  getFormattedDate,
  getTitleCase,
  getProjectColor,
};

export function encryption(text: string): any {
  var jsEncrypt = new JSEncrypt();
  jsEncrypt.setPublicKey(key.PUBLIC_KEY);
  return jsEncrypt.encrypt(text);
}
