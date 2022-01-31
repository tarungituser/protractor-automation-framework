import { element, By } from 'protractor';

export class HomePageConstants {
    static fontsLink = element(By.css('a.site-header__nav-link[href="/fonts/"]'));
    static productsLink = element(By.css('a.site-header__nav-link[href="/products/"]'));
    static studioLink = element(By.css('a.site-header__nav-link[href="/products/studio/"]'));
    static resourcesLink = element(By.css('a.site-header__nav-link[href="/resources/"]'));
    static supportLink = element(By.css('a.site-header__nav-link[href="/support/"]'));
    static fullDom = element(By.css('html'));
}
