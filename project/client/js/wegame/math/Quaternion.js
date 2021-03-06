import Mathf from './Mathf'
import Vector3 from './Vector3'

export default class Quaternion {
  constructor(x = 0, y = 0, z = 0, w = 1) {
    this.x = x
    this.y = y
    this.z = z
    this.w = w
  }

  copy(q = null) {
    if (q == null) {
      return new Quaternion().copy(this)
    } else {
      this.x = q.x
      this.y = q.y
      this.z = q.z
      this.w = q.w
      return this
    }
  }

  multiply(q) {
    let x = this.w * q.x + this.x * q.w + this.y * q.z - this.z * q.y
		let y = this.w * q.y + this.y * q.w + this.z * q.x - this.x * q.z
		let z = this.w * q.z + this.z * q.w + this.x * q.y - this.y * q.x
		let w = this.w * q.w - this.x * q.x - this.y * q.y - this.z * q.z

		return new Quaternion(x, y, z, w)
  }

  multiplyVector3(v) {
    let q = this.multiply(new Quaternion(v.x, v.y, v.z, 0)).multiply(this.inversed())
    return new Vector3(q.x, q.y, q.z)
  }

  inverse() {
    this.x = -this.x
    this.y = -this.y
    this.z = -this.z
    this.w = this.w
  }

  inversed() {
    let q = this.copy()
    q.inverse()
    return q
  }

  static AngleAxis(angle, axis) {
    let v = axis.normalized()

		let cosv = Math.cos(Mathf.DEG2RAD * angle * 0.5)
		let sinv = Math.sin(Mathf.DEG2RAD * angle * 0.5)

		let x = v.x * sinv
		let y = v.y * sinv
		let z = v.z * sinv
		let w = cosv

		return new Quaternion(x, y, z, w)
  }

  static Euler(x, y, z) {
    let around_x = Quaternion.AngleAxis(x, new Vector3(1, 0, 0))
    let around_y = Quaternion.AngleAxis(y, new Vector3(0, 1, 0))
    let around_z = Quaternion.AngleAxis(z, new Vector3(0, 0, 1))

    return around_y.multiply(around_x).multiply(around_z)
  }
}
