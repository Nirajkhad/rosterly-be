const createBusiness = ( body ) => {
    return {
        uuid: body?.uuid,
        name: body?.name,
        abn: body?.abn,
        business_type:body?.business_type,
        phone_number: body?.phone_number,
        personal_phone_number: body?.personal_phone_number,
        address: body?.address,
        suburb: body?.suburb,
        state: body?.state,
        pay_period: body?.pay_period,
        week_start: body?.week_start,
        postcode: body?.postcode,
        user_id: body?.user_id
    }
}

module.exports = {
    createBusiness
}