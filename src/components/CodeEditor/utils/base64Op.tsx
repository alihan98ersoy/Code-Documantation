// You can use the React library to create TSX components
import React from "react";

export function base64Decode(str: string | undefined) {
  if (str === undefined) {
    return atob("SGVsbG8gV29ybGQK\n");
  }
  return decodeURIComponent(
    atob(str)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
}
