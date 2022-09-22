import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.raw(
    `CREATE TABLE tag( id serial PRIMARY KEY, "name" varchar NOT NULL UNIQUE);`
  )
  await knex.raw(
    `CREATE TABLE product( id serial PRIMARY KEY, "name" varchar NOT NULL UNIQUE);`
  )
  await knex.raw(
    `CREATE TABLE product_tags( id serial PRIMARY KEY, product_id integer NOT NULL, tag_id integer NOT NULL);`
  )
  await knex.raw(
    `CREATE TABLE expense( id serial PRIMARY KEY, product_id integer NOT NULL, count integer NOT NULL, unit_price float4 NOT NULL, date date NOT NULL, discount float4, place point, receipt text, payment_method text, part_count integer, part_total integer);`
  )
  await knex.raw(
    `ALTER TABLE product_tags ADD CONSTRAINT product_tags_product_id_fkey FOREIGN KEY (product_id) REFERENCES product (id);`
  )
  await knex.raw(
    `ALTER TABLE product_tags ADD CONSTRAINT product_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES tag (id);`
  )
  await knex.raw(
    `ALTER TABLE expense ADD CONSTRAINT expense_product_id_fkey FOREIGN KEY (product_id) REFERENCES product (id);`
  )
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP TABLE expense;`)
  await knex.raw(`DROP TABLE product_tags;`)
  await knex.raw(`DROP TABLE product;`)
  await knex.raw(`DROP TABLE tag;`)
}
