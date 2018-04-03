/**
 * @param id
 * @param name
 * @param description
 * @param ingredients
 * @constructor
 */
export default function Recipe(id, name = "", description = "", ingredients = []) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.ingredients = ingredients;
}