/**
 * Transform data user to data user to table
 *
 * @param {Array} members - List of members
 * @returns {Array} list of members to burbles
 */
export function toMembersBurbles(members) {
    let newMembers = null;
    if (members !== undefined && members !== null) {
        newMembers = members.filter((member) => member.role !== "Sin rol");
    }
    return newMembers;
}
