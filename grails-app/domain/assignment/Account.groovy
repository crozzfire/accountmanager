package assignment

import grails.rest.Resource

import java.sql.Date

@Resource(uri = '/account')
class Account {

    String email
    String name
    Date dob

    static constraints = {
        email email: true, unique: true, blank: false
        name blank: false
        dob  blank: false
    }
}
