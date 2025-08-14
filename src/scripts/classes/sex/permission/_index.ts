import { SexPermission_Alpha } from "./permissions/SexPermission_Alpha";
import { SexPermission_Full } from "./permissions/SexPermission_Full";
import { SexPermission_None } from "./permissions/SexPermission_None";

export const SexPermissionClass = {
  SexPermission_Alpha,
  SexPermission_Full,
  SexPermission_None,
};

export const sexpermission = {
  alpha: new SexPermission_Alpha(),
  full: new SexPermission_Full(),
  none: new SexPermission_None(),
};
