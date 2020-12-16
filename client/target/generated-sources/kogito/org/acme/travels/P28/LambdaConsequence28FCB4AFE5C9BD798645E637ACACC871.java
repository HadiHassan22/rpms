package org.acme.travels.P28;

import static org.acme.travels.Rules2E460E98FBDF296CF50748F35F942A65.*;
import org.acme.travels.*;
import org.acme.travels.Person;
import org.drools.modelcompiler.dsl.pattern.D;

@org.drools.compiler.kie.builder.MaterializedLambda()
public enum LambdaConsequence28FCB4AFE5C9BD798645E637ACACC871 implements org.drools.model.functions.Block2<org.drools.model.Drools, org.acme.travels.Person> {

    INSTANCE;

    public static final String EXPRESSION_HASH = "FE1BF3B8D395F6B12E6BED683263B055";

    private final org.drools.model.BitMask mask_$person = org.drools.model.BitMask.getPatternMask(DomainClassesMetadata2E460E98FBDF296CF50748F35F942A65.org_acme_travels_Person_Metadata_INSTANCE, "adult");

    @Override()
    public void execute(org.drools.model.Drools drools, org.acme.travels.Person $person) throws java.lang.Exception {
        {
            {
                {
                    ($person).setAdult(true);
                    drools.update($person, mask_$person);
                }
            }
        }
    }
}
