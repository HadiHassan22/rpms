package org.acme.travels;

import org.drools.modelcompiler.dsl.pattern.D;
import org.drools.model.Index.ConstraintType;
import org.acme.travels.Person;
import static org.acme.travels.Rules2E460E98FBDF296CF50748F35F942A65.*;

public class Rules2E460E98FBDF296CF50748F35F942A65RuleMethods0 {

    /**
     * Rule name: Is adult
     */
    public static org.drools.model.Rule rule_Is_32adult() {
        final org.drools.model.Variable<org.acme.travels.Person> var_$person = D.declarationOf(org.acme.travels.Person.class,
                                                                                               DomainClassesMetadata2E460E98FBDF296CF50748F35F942A65.org_acme_travels_Person_Metadata_INSTANCE,
                                                                                               "$person");
        final org.drools.model.BitMask mask_$person = org.drools.model.BitMask.getPatternMask(DomainClassesMetadata2E460E98FBDF296CF50748F35F942A65.org_acme_travels_Person_Metadata_INSTANCE,
                                                                                              "adult");
        org.drools.model.Rule rule = D.rule("org.acme.travels",
                                            "Is adult").attribute(org.drools.model.Rule.Attribute.RULEFLOW_GROUP,
                                                                  "person")
                                                       .build(D.pattern(var_$person).expr("6F251A649871E8072C2937D82BA1FABD",
                                                                                          org.acme.travels.P2C.LambdaPredicate2CAB5791D8F0E973E04F28A4452B283D.INSTANCE,
                                                                                          D.alphaIndexedBy(java.lang.Integer.class,
                                                                                                           org.drools.model.Index.ConstraintType.GREATER_THAN,
                                                                                                           DomainClassesMetadata2E460E98FBDF296CF50748F35F942A65.org_acme_travels_Person_Metadata_INSTANCE.getPropertyIndex("age"),
                                                                                                           org.acme.travels.PD9.LambdaExtractorD96E873624F68CAEB1239CF63531014C.INSTANCE,
                                                                                                           18),
                                                                                          D.reactOn("age")),
                                                              D.on(var_$person).execute(org.acme.travels.P28.LambdaConsequence28FCB4AFE5C9BD798645E637ACACC871.INSTANCE));
        return rule;
    }
}
