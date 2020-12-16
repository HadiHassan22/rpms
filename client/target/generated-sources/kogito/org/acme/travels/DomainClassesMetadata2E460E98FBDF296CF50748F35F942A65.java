package org.acme.travels;
public class DomainClassesMetadata2E460E98FBDF296CF50748F35F942A65 {

    public static final org.drools.model.DomainClassMetadata org_acme_travels_Person_Metadata_INSTANCE = new org_acme_travels_Person_Metadata();
    private static class org_acme_travels_Person_Metadata implements org.drools.model.DomainClassMetadata {

        @Override
        public Class<?> getDomainClass() {
            return org.acme.travels.Person.class;
        }

        @Override
        public int getPropertiesSize() {
            return 3;
        }

        @Override
        public int getPropertyIndex( String name ) {
            switch(name) {
                case "adult": return 0;
                case "age": return 1;
                case "name": return 2;
             }
             throw new RuntimeException("Unknown property '" + name + "' for class class class org.acme.travels.Person");
        }
    }

}