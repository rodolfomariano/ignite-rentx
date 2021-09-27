import { Model } from '@nozbe/watermelondb'
import { field } from '@nozbe/watermelondb/decorators'

class User extends Model {
  static table = 'users' // name of table in database

  @field('user_id') // name using on database
  user_id!: string // name using in project

  @field('name')
  name!: string // ! mandatory field

  @field('email')
  email!: string

  @field('driver_license')
  driver_license!: string

  @field('avatar')
  avatar?: string

  @field('token')
  token!: string

}

export { User }