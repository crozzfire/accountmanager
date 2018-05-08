package accountmanager

import assignment.Account

import java.sql.Date

class BootStrap {

    def init = { servletContext ->

        def randomDate = {
            def cur = System.currentTimeMillis()
            def rand = new Random()
            Long yearOffset = 10 * 365 * 24 * 60 * 60 * 1000
            Long random = rand.nextInt(20) *  365 * 24 * 60 * 60 * 1000
            Long timestamp = cur -  (random + yearOffset)

            new Date(timestamp)
        }


        new Account(email: "roy@gmail.com", name: "Souvik Roy", dob: randomDate()).save()
        new Account(email: "goku@gmail.com", name: "Super Saiyanjin", dob: randomDate()).save()
        new Account(email: "naruto@gmail.com", name: "Uzumaki Naruto", dob: randomDate()).save()
        new Account(email: "nyan@gmail.com", name: "Nyan cat", dob: randomDate()).save()
        new Account(email: "Foo@gmail.com", name: "Foo Bar", dob: randomDate()).save()
        new Account(email: "chris@gmail.com", name: "Chris", dob: randomDate()).save()
        new Account(email: "jay@gmail.com", name: "Jay", dob: randomDate()).save()
        new Account(email: "peter@gmail.com", name: "Peter Murphy", dob: randomDate()).save()
        new Account(email: "steven@gmail.com", name: "Steven Wilson", dob: randomDate()).save()
        new Account(email: "opeth@gmail.com", name: "Opeth", dob: randomDate()).save()
        new Account(email: "metallica@gmail.com", name: "Metallica", dob: randomDate()).save()
        new Account(email: "maiden@gmail.com", name: "Iron Maiden", dob: randomDate()).save()
        new Account(email: "abhishek@gmail.com", name: "Abhishek", dob: randomDate()).save()
        new Account(email: "ichigo@gmail.com", name: "Ichigo", dob: randomDate()).save()

    }

    def destroy = {
    }
}
