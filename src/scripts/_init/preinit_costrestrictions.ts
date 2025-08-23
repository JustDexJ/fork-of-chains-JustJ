import { qcImpl } from "../classes/cost/_index";
import { qresImpl } from "../classes/restriction/_index";

type qcImpl_ = typeof qcImpl;
type qresImpl_ = typeof qresImpl;

/**
 * Contains helper constructor functions for the subclasses of setup.Cost in setup.qcImpl
 */
const qc = {} as any as {
  [k in keyof qcImpl_]: ((
    ...args: ConstructorParameters<qcImpl_[k]>
  ) => InstanceType<qcImpl_[k]>) & { class: qcImpl_[k] };
};

//const qc = {} as any as {
//  [k in keyof qcImpl_]: (...args: ConstructorParameters<qcImpl_[k]>) => Cost;
//};

/**
 * Contains helper constructor functions for the subclasses of setup.Restriction in setup.qresImpl
 */
const qres = {} as any as {
  [k in keyof qresImpl_]: ((
    ...args: ConstructorParameters<qresImpl_[k]>
  ) => InstanceType<qresImpl_[k]>) & { class: qresImpl_[k] };
};

Object.assign(setup, {
  qcImpl,
  qc,
  qresImpl,
  qres,
});

Cost.initConstructors();
Restriction.initConstructors();

export { qc, qcImpl, qres, qresImpl };
